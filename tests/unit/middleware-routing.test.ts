import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";

import middleware from "@/middleware";

/**
 * Regressions de routage du middleware.
 *
 * Le piege : next-intl ne fait aucune exception pour `/api`. Avec
 * `localePrefix: "always"`, il ajoute `/fr` a tout pathname depourvu de
 * prefixe de locale, `/api/...` compris. `/api/exam/<id>/answer` se
 * retrouvait alors reecrit en `/fr/api/exam/<id>/answer` : aucune route ne
 * correspond, donc 404 sur chaque sauvegarde et chaque soumission, pendant que
 * le chronometre continuait de tourner cote serveur.
 *
 * Ces tests verrouillent l'invariant : une route API ne sort jamais du
 * middleware avec une reecriture ni une redirection de locale.
 */

const ORIGIN = "http://localhost:3000";
const SESSION_COOKIE = "authjs.session-token";

function request(
  pathname: string,
  init: Omit<RequestInit, "signal"> & { cookie?: string } = {},
): NextRequest {
  const headers = new Headers(init.headers);
  if (init.cookie) headers.set("cookie", init.cookie);
  return new NextRequest(new URL(pathname, ORIGIN), { ...init, headers });
}

/** Reecriture interne introduite par next-intl. */
function rewriteOf(response: Response): string | null {
  return response.headers.get("x-middleware-rewrite");
}

/** Destination d'une redirection, sous forme relative a l'origine. */
function locationOf(response: Response): string | null {
  const location = response.headers.get("location");
  if (location === null) return null;
  return new URL(location, ORIGIN).pathname + new URL(location, ORIGIN).search;
}

describe("middleware — routes API", () => {
  const apiPaths = [
    "/api/exam/section-run-1/answer",
    "/api/exam/section-run-1/submit",
    "/api/exam/section-run-1/heartbeat",
    "/api/auth/session",
  ];

  it.each(apiPaths)("ne localise pas %s", (pathname) => {
    const response = middleware(request(pathname, { method: "POST" }));

    expect(rewriteOf(response)).toBeNull();
    expect(response.headers.get("location")).toBeNull();
    expect(response.headers.get("x-middleware-next")).toBe("1");
  });

  it("n'exige pas de session (chaque route API verifie la sienne)", () => {
    const response = middleware(request("/api/exam/section-run-1/answer", { method: "POST" }));

    // Une redirection vers /login enverrait du HTML a un client qui attend du JSON.
    expect(response.headers.get("location")).toBeNull();
    expect(response.status).toBe(200);
  });

  it("canonise un appel obsolete vers /fr/api/... au lieu de repondre 404", () => {
    const response = middleware(request("/fr/api/exam/section-run-1/answer", { method: "POST" }));

    expect(response.status).toBe(307);
    // 307 : la methode POST et le corps sont conserves par le client.
    expect(locationOf(response)).toBe("/api/exam/section-run-1/answer");
  });

  it("conserve la query string lors de la canonicalisation", () => {
    const response = middleware(request("/fr/api/exam/section-run-1/heartbeat?cache=0"));

    expect(locationOf(response)).toBe("/api/exam/section-run-1/heartbeat?cache=0");
  });

  it("applique le filtrage anti-bots aux routes API", () => {
    const response = middleware(
      request("/api/exam/section-run-1/answer", {
        method: "POST",
        headers: { "user-agent": "GPTBot/1.2 (+https://openai.com/gptbot)" },
      }),
    );

    expect(response.status).toBe(403);
  });

  it("pose X-Robots-Tag sur les routes API", () => {
    const response = middleware(request("/api/exam/section-run-1/answer", { method: "POST" }));

    expect(response.headers.get("x-robots-tag")).toContain("noindex");
  });
});

describe("middleware — pages localisees", () => {
  it("renvoie vers la connexion une page protegee sans session", () => {
    const response = middleware(request("/fr/exam/section-run-1"));

    expect(response.status).toBe(307);
    expect(locationOf(response)).toContain("/fr/login");
  });

  it("laisse passer une page protegee avec session", () => {
    const response = middleware(
      request("/fr/exam/section-run-1", { cookie: `${SESSION_COOKIE}=session-token` }),
    );

    expect(response.headers.get("location")).toBeNull();
    // Le segment `[locale]` est un vrai segment de route : next-intl le
    // conserve pour addresser `app/[locale]/exam/[sectionRunId]`.
    expect(rewriteOf(response)).toBe(`${ORIGIN}/fr/exam/section-run-1`);
  });

  it("ne confond pas une page API avec une page protegee", () => {
    // `/api/exam/...` contient bien `/exam` : sans le court-circuit, le
    // pathname passerait pour la page `/exam/...` et le garde de session
    // s'appliquerait a tort.
    const response = middleware(request("/api/exam/section-run-1/heartbeat", { method: "GET" }));

    expect(response.headers.get("location")).toBeNull();
    expect(rewriteOf(response)).toBeNull();
  });

  it("localise une page publique non prefixee", () => {
    const response = middleware(request("/tests"));

    expect(response.status).toBe(307);
    expect(locationOf(response)).toBe("/fr/tests");
  });
});
