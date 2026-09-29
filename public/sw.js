/* eslint-disable no-restricted-globals */
/**
 * Service worker TCF Simulator.
 *
 * Objectifs :
 *  - rendre l'application installable et lancable hors ligne ;
 *  - servir les pages publiques deja visitees et les ressources statiques ;
 *  - ne jamais mettre en cache les donnees d'examen ni les pages authentifiees.
 *
 * Regle de securite : l'examen est autoritaire cote serveur (chronometre,
 * reponses, expiration). Aucun HTML dynamique n'est donc servi depuis le cache,
 * et aucune requete non-GET (reponses, soumission, heartbeat) n'est interceptee.
 */

const VERSION = "v1";
const STATIC_CACHE = "tcf-static-" + VERSION;
const PAGES_CACHE = "tcf-pages-" + VERSION;
const OFFLINE_URL = "/offline.html";

const PRECACHE_URLS = [
  OFFLINE_URL,
  "/manifest.webmanifest",
  "/favicon.ico",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

/** Prefixes jamais interceptes (API, examen, donnees perso). */
const BYPASS_PREFIXES = [
  "/api/",
  "/fr/exam",
  "/fr/results",
  "/fr/dashboard",
  "/fr/history",
  "/fr/admin",
  "/_next/webpack-hmr",
];

/** Pages publiques mises en cache pour la navigation hors ligne. */
const CACHEABLE_PAGES = [
  /^\/fr\/?$/,
  /^\/fr\/tests\/?$/,
  /^\/fr\/tests\/[A-Za-z0-9._-]+\/?$/,
  /^\/fr\/login\/?$/,
  /^\/fr\/register\/?$/,
];

function isCacheablePage(pathname) {
  return CACHEABLE_PAGES.some(function (pattern) {
    return pattern.test(pathname);
  });
}

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then(function (cache) {
        // addAll echoue en bloc si une seule ressource manque : on isole.
        return Promise.all(
          PRECACHE_URLS.map(function (url) {
            return cache.add(new Request(url, { cache: "reload" })).catch(function () {
              return undefined;
            });
          })
        );
      })
      // Pas de skipWaiting automatique : l'activation est declenchee par
      // l'utilisateur via le message SKIP_WAITING (bouton "Actualiser").
      .then(function () {
        return undefined;
      })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (keys) {
        return Promise.all(
          keys.map(function (key) {
            if (key !== STATIC_CACHE && key !== PAGES_CACHE) {
              return caches.delete(key);
            }
            return undefined;
          })
        );
      })
      .then(function () {
        return self.clients.claim();
      })
  );
});

self.addEventListener("message", function (event) {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

/** Static : cache d'abord, rafraichissement en arriere-plan. */
function cacheFirst(request) {
  return caches.match(request).then(function (cached) {
    const network = fetch(request)
      .then(function (response) {
        if (response && response.ok && response.type === "basic") {
          const copy = response.clone();
          caches.open(STATIC_CACHE).then(function (cache) {
            cache.put(request, copy);
          });
        }
        return response;
      })
      .catch(function () {
        return cached;
      });
    return cached || network;
  });
}

/**
 * Navigation : reseau d'abord, repli sur le cache puis sur offline.html.
 *
 * Les pages publiques sont mises en cache ; les routes protegees (tableau de
 * bord, resultats, examen, administration) ne le sont jamais, afin qu'aucune
 * donnee personnelle ne puisse etre relue depuis le cache du navigateur. Leur
 * repli hors ligne est directement la page hors ligne.
 */
function navigationHandler(request) {
  const url = new URL(request.url);
  const cacheable = isCacheablePage(url.pathname);
  const key = cacheable ? url.pathname : null;

  return fetch(request)
    .then(function (response) {
      if (key && response && response.ok) {
        const copy = response.clone();
        caches.open(PAGES_CACHE).then(function (cache) {
          cache.put(key, copy);
        });
      }
      return response;
    })
    .catch(function () {
      var fallback = key ? caches.match(key) : Promise.resolve(null);
      return fallback
        .then(function (hit) {
          return hit || caches.match(OFFLINE_URL);
        })
        .then(function (hit) {
          // Dernier recours : reponse synthetique pour ne jamais laisser
          // respondWith sans valeur (le navigateur afficherait une erreur).
          return (
            hit ||
            new Response("Hors ligne", {
              status: 503,
              statusText: "Service Unavailable",
              headers: { "Content-Type": "text/plain; charset=utf-8" },
            })
          );
        });
    });
}

function isBypassed(pathname) {
  for (var i = 0; i < BYPASS_PREFIXES.length; i += 1) {
    if (pathname.startsWith(BYPASS_PREFIXES[i])) return true;
  }
  return false;
}

self.addEventListener("fetch", function (event) {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET") return;
  if (url.origin !== self.location.origin) return;

  // Navigation : traitee systematiquement, y compris pour les routes protegees,
  // afin qu'une coupure reseau affiche la page hors ligne plutot que
  // l'erreur brute du navigateur. Ces routes ne sont jamais mises en cache.
  if (request.mode === "navigate") {
    event.respondWith(navigationHandler(request));
    return;
  }

  if (isBypassed(url.pathname)) return;

  // Ressources statiques (build Next.js, polices, images, icones).
  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    /\.(?:css|js|woff2?|ttf|png|jpe?g|svg|webp|avif|ico)$/.test(url.pathname)
  ) {
    event.respondWith(cacheFirst(request));
  }
});
