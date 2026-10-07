# TCF Simulator

Plateforme d'entraînement au **TCF Tout public** (France Éducation International) :
tests blancs chronométrés, correction détaillée, estimation de niveau CECRL et
section dédiée à la compréhension orale.

- Interface intégralement en français (`/fr`)
- **Chronomètre autoritaire côté serveur** : aucune bonne réponse n'est envoyée
  au client pendant l'épreuve, et une coupure réseau ne fait perdre aucune réponse
- Reprise automatique d'une épreuve en cours, à la question près
- Correction détaillée, historique des tentatives et estimation de niveau CECRL
- **Compréhension orale** : 8 séries audio de A1 à C2 avec transcription et explications
- PWA installable, consultable hors ligne pour les pages publiques
- SQLite en développement, PostgreSQL en production

---

## Table des matières

1. [Fonctionnalités](#fonctionnalités)
2. [Stack technique](#stack-technique)
3. [Architecture](#architecture)
4. [Démarrage local](#démarrage-local)
5. [Variables d'environnement](#variables-denvironnement)
6. [Scripts](#scripts)
7. [Contenu et données](#contenu-et-données)
8. [Authentification](#authentification)
9. [Identité visuelle](#identité-visuelle)
10. [PWA](#pwa)
11. [Tests et validation](#tests-et-validation)
12. [Déploiement](#déploiement)
13. [Vérifier un déploiement](#vérifier-un-déploiement)
14. [Avertissement](#avertissement)

---

## Fonctionnalités

| Domaine | Détail |
| --- | --- |
| Tests blancs | 5 tests complets, 10 sections, 250 questions, 150 documents, 400 minutes au total |
| Compréhension orale | 8 séries d'entraînement (A1 → C2), 120 questions, audio + transcription + explication |
| Épreuve | Chronomètre serveur, reprise de tentative, réponses en file d'attente côté client |
| Correction | Détail question par question, score écrit à la soumission, estimation CECRL |
| Suivi | Tableau de bord, historique, espace d'administration |
| PWA | Installable, pages publiques consultables hors ligne |

## Stack technique

| | |
| --- | --- |
| Framework | Next.js 14 (App Router, route groups) |
| Langage | TypeScript (strict) |
| Style | Tailwind CSS + variables de thème, shadcn/ui, framer-motion |
| i18n | next-intl 3 (`/fr` actif, `en` conservé sur disque) |
| Base de données | Prisma 5 — SQLite (local) / PostgreSQL (production) |
| Authentification | Auth.js v5 — email/mot de passe (bcrypt) + Google OAuth |
| Validation | Zod (schémas partagés entre serveur et client) |
| Tests | Vitest, unitaires purs (node, sans base ni navigateur) |
| Audio | Génération TTS via `edge-tts` (fichiers MP3 versionnés) |

## Architecture

Projection des répertoires principaux :

```
app/[locale]/          # groups de routes Next.js
  (marketing)          #  pages publiques
  (auth)               #  login / enregistrement / mot de passe
  (app)                #  tableau de bord, historique, résultats, corrections, admin
  (exam)               #  passage de l'épreuve
app/api/               #  routes API (examen = answer/submit/heartbeat, auth, admin)
components/            # UI réutilisable
config/                # enums (Zod), barème de scoring, site
server/                # server actions + services de domaine
lib/                   # singleton db, validation d'env, URL de pool
data/                  # contenu source : tests, compréhension orale, lecture
scripts/               # outils CLI (seed, imports, audio, rescore, icônes…)
tests/unit/            # tests unitaires (Vitest)
i18n/messages/         # dictionnaires next-intl (fr.json, en.json)
```

Principes de conception, à ne pas contourner :

- **L'épreuve est autoritaire côté serveur** : le minuteur, la correction et les
  réponses vivent sur le serveur ; le client ne fait que mettre en file d'attente
  et rejouer ses réponses. Ne jamais déplacer minuteur ou correction côté client.
- `middleware.ts` gère l'i18n **et** le garde-fou de session. Les routes API sont
  volontairement exemptées du préfixe de locale et du cookie de garde : chacune
  appelle `auth()` de son côté.
- Deux schémas Prisma coexistent : `prisma/schema.prisma` (PostgreSQL, canonique)
  et `prisma/schema.sqlite.prisma` (miroir **généré**). Le sélecteur
  `scripts/prisma.mjs` choisit selon `DATABASE_PROVIDER` — pas de fallback silencieux.
- Pas de dossier `prisma/migrations` : `db:push` est la seule voie d'application.

## Démarrage local

Prérequis : **Node.js ≥ 18.18** et npm.

```bash
npm install
cp .env.example .env        # Windows PowerShell : Copy-Item .env.example .env
npm run db:push             # crée le schéma SQLite
npm run db:seed             # contenu + comptes de démonstration
npm run dev                 # http://localhost:3000/fr
```

Comptes créés par le seed :

| Rôle | Identifiant | Mot de passe |
| --- | --- | --- |
| Administrateur | `admin@tcf-simulator.local` | `Admin!2345` |
| Candidat | `candidat@tcf-simulator.local` | `Candidat!2345` |

> Changez ces mots de passe avant toute mise en ligne (`SEED_ADMIN_PASSWORD`,
> `SEED_DEMO_PASSWORD`), ou supprimez le compte de démonstration.

> `npm install` exploite `.npmrc` (`legacy-peer-deps=true`), imposé par les
> pairs de `@vercel/analytics` — ne le retirez pas.

## Variables d'environnement

Copiez `.env.example` vers `.env` et adaptez. Récapitulatif :

| Variable | Rôle | Défaut local |
| --- | --- | --- |
| `DATABASE_PROVIDER` | « sqlite » ou « postgresql », choisit le schéma Prisma | `sqlite` |
| `DATABASE_URL` | `file:./dev.db` ou URL PostgreSQL | `file:./dev.db` |
| `AUTH_SECRET` | Signature des JWT (≥ 32 octets) | — |
| `AUTH_URL` | URL publique de l'application | `http://localhost:3000` |
| `AUTH_TRUST_HOST` | S'auto-autoriser comme hôte derrière un proxy | `true` |
| `AUTH_EMAIL_ENABLED` | Active la connexion email/mot de passe | `true` |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Client OAuth Google (optionnel, vide = désactivé) | vide |
| `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` | Compte administrateur du seed | cf. démo |
| `SEED_DEMO_EMAIL` / `SEED_DEMO_PASSWORD` | Compte candidat du seed | cf. démo |
| `NEXT_PUBLIC_APP_URL` | URL publique pour le rendu client | `http://localhost:3000` |
| `NEXT_PUBLIC_APP_NAME` | Nom lisible de l'application | `TCF Simulator` |
| `NEXT_PUBLIC_SW_VERSION` | Version du service worker (stable entre déploiements) | `v1` |
| `TCF_SOURCE_JSON` | Source d'import des 5 tests | `data/tcf_practice_5_tests_250_questions.json` |
| `TCF_SEED_PUBLISH` | Publier les tests au seed (`true`/`false`) | `true` |
| `SEED_LISTENING_ONLY` | `1` = le seed ne charge que la compréhension orale | absent |
| `DIRECT_URL` | URL directe du pooler (adapter Prisma + Postgres, `db:push`) | absent |

Génération d'un secret valide : `openssl rand -base64 32`.

## Scripts

### Qualité et vérification

```bash
npm run typecheck       # tsc --noEmit
npm run lint            # next lint (code applicatif uniquement)
npm run test            # vitest (tests unitaires)
npm run verify          # typecheck + lint + test — à exécuter avant de finir
npm run build           # prisma generate + next build
```

### Base de données

```bash
npm run db:push         # applique le schéma (seule voie, pas de migrations)
npm run db:seed         # contenu + comptes de démonstration
npm run db:reset        # réinitialise la base locale puis re-seed
npm run db:generate     # régénère le client Prisma (utilise DATABASE_PROVIDER)
npm run db:check        # valide le schéma
npm run db:studio       # inspecter la base (Prisma Studio)
npm run db:use:sqlite   # bascule le miroir de schéma sur SQLite
npm run db:use:postgres # bascule le miroir de schéma sur PostgreSQL
npm run db:rescore      # recalcule les scores écrits (barème changeant) — voir plus bas
```

### Contenu

```bash
npm run import:tests         # importe data/*.json (les 5 tests)
npm run import:csv           # importe un CSV
npm run export:csv           # exporte les questions en CSV
npm run content:reading      # applique les modules de compréhension écrite (data/ce)
npm run content:reading:check    # mode contrôle (n'applique rien)
npm run content:reading:verify   # vérifie l'intégrité des questions en base
npm run content:check        # contrôle la cohérence des modules de lecture
npm run content:encoding     # contrôle l'encodage des modules de lecture
npm run db:audit             # audite l'intégrité du contenu de lecture en base
npm run audio:co             # génère/synchronise l'audio de la compréhension orale
npm run audio:co:check       # vérifie que chaque item a un fichier audio valide
```

> **Barème et notes** : le score est écrit **une seule fois, à la soumission**.
> Après toute modification de `config/scoring.ts` ou `server/services/grading.ts`,
> relancez `npm run db:rescore` (testez d'abord avec `--dry-run`), sinon le
> tableau de bord, l'historique et l'administration affichent l'ancien score.
> Les pages de résultat, elles, recalculent à la lecture.

### Identité visuelle et administration

```bash
npm run icons:generate   # régénère logo, favicon et icônes PWA depuis logo.png
npm run assets:hero      # prépare la photo de fond du hero
npm run admin:create     # crée un compte administrateur
```

## Contenu et données

| Source | Contenu | Import |
| --- | --- | --- |
| `data/tcf_practice_5_tests_250_questions.json` | 5 tests, 10 sections, 250 questions, 1000 options, 150 documents | `npm run db:seed` |
| `data/co/` (module TS) | 8 séries de compréhension orale, A1 → C2 (annonces, conversations, radio, débats…) : transcription exacte, question, 4 propositions, bonne réponse, explication | `npm run db:seed` |
| `data/ce/` | Modules de compréhension écrite | `npm run content:reading` |

La compréhension orale souscrit à 120 items accompagnés d'un fichier audio
(`public/audio/co/…`) et d'une transcription strictement identique à l'énoncé
prononcé. L'audio est généré par synthèse (`edge-tts`) via
`npm run audio:co`, et `npm run audio:co:check` garantit qu'aucun item ne peut
être servi sans son fichier audio (le seed échoue sinon).

Le seed est **idempotent** : relancé sur une base existante, il ne duplique rien.
Deux modes :

- **Complet** (défaut) : insère le contenu puis crée/mit à jour les comptes de démonstration ;
- **Compréhension orale seule** (`SEED_LISTENING_ONLY=1`) : n'ajoute que les
  séries audio — le mode à utiliser pour ajouter du contenu CO sur une base de
  production sans toucher aux comptes, tentatives ou résultats existants.

## Authentification

Authentification gérée par **Auth.js v5** (`next-auth` beta) avec l'adaptateur
Prisma :

- **Email + mot de passe** (défaut) : haché via `bcryptjs`, stratégie de session **JWT** ;
- **Google OAuth** (optionnel) : activé dès que `AUTH_GOOGLE_ID` et
  `AUTH_GOOGLE_SECRET` sont définis — le bouton « Continuer avec Google »
  disparaît automatiquement sinon.

Un compte Google dont l'adresse correspond à un compte existant y est
**rattaché** (résultats, historique et niveau conservés) grâce à
`allowDangerousEmailAccountLinking`.

### Configurer Google OAuth en production

1. Dans [Google Cloud Console](https://console.cloud.google.com/apis/credentials),
   créez un client **OAuth 2.0** de type *Application Web* ;
2. Ajoutez les **Authorized redirect URIs** (valeurs **exactes**) :
   - `https://<votre-domaine>/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google` (dev local)
3. Dans Vercel, posez les variables d'environnement `AUTH_GOOGLE_ID` et
   `AUTH_GOOGLE_SECRET` avec la portée **All Environments**, puis **redéployez** :

> Vérifiez le bon fonctionnement après redéploiement : un `POST`
> `/api/auth/signin/google` avec un jeton CSRF valide doit répondre **302** vers
> `accounts.google.com` (un retour `?error=Configuration` signifie que les
> variables manquent au déploiement).

Aucune modification de base de données n'est nécessaire pour cette fonctionnalité.

## Identité visuelle

`logo.png` (racine du dépôt) est l'unique source du logo. Il n'est pas utilisé
tel quel : le fichier est un carré de 1254 px dont le dessin n'occupe que 20 %
de la surface, le reste étant transparent.

```bash
npm run icons:generate
```

Recadre les marges, puis produit :

- `public/brand/logo.png` — logo servi dans l'interface, via
  `components/layout/brand-logo.tsx` (en-tête, pied de page, écrans de connexion) ;
- `public/favicon.ico` — icône multi-résolution 16/32/48 px ;
- `public/icons/*.png` — icônes d'installation PWA, dont une version `maskable`
  qui reçoit un fond opaque (Android rogne les icônes en forme).

Le dessin est bleu marine foncé : sur fond clair il se suffit à lui-même ; un
cartouche blanc est ajouté en mode sombre via la classe `dark:bg-white`.

La photo de fond du hero suit la même logique : `paris4k.jpg` (racine) est
préparée par `npm run assets:hero`, qui l'agrandit au filtre Lanczos et y cuit
un flou léger. Ce flou n'est pas fait en CSS : combiné à une animation
`transform`, un `filter: blur()` se recalculerait à chaque image sur une couche
de la taille de l'écran.

Ne modifiez pas à la main les fichiers sous `public/brand/`, `public/icons/` ou
`public/favicon.ico` : régénérez-les systématiquement via `npm run icons:generate`.

## PWA

Le service worker (`public/sw.js`) applique une politique volontairement
conservatrice, car l'épreuve est autoritaire côté serveur :

- **cache** : pages publiques (`/fr`, `/fr/tests`, connexion), ressources
  statiques et fichiers audio de la compréhension orale ;
- **jamais en cache** : `/api/*`, l'épreuve, les résultats, le tableau de bord,
  l'historique et l'espace d'administration ;
- les requêtes non-`GET` (sauvegarde de réponse, soumission) ne sont jamais interceptées.

Une coupure réseau pendant une épreuve ne perd donc aucune réponse : le client
met en file d'attente et rejoue au retour du réseau.

Pour forcer une mise à jour de la PWA, incrémentez `VERSION` dans
`public/sw.js` : les clients reçoivent alors la notification « Actualiser ».

## Tests et validation

Les tests sont des **tests unitaires purs** (`tests/unit/`, Vitest) exécutés en
environnement Node : aucune base de données, aucun navigateur requis. Ils
couvrent notamment le barème de scoring, les gardes de build (schémas Prisma),
la validation des réponses et le service de compréhension orale.

```bash
npm run verify      # typecheck + lint + test
npm run test        # exécution unique
npm run test:watch  # mode watch
```

> Il n'existe ni configuration ni tests Playwright dans le dépôt : `test:e2e`
> est un placeholder — ne lancez pas de campagne e2e.

## Déploiement

Production : **https://tcf-simulator-tn.vercel.app** (Vercel + PostgreSQL
Supabase). Le dépôt GitHub est déployé automatiquement sur chaque `push` de la
branche `main`.

Vercel ne dispose pas d'un système de fichiers persistant : **SQLite n'y
fonctionne pas**. Utilisez PostgreSQL.

1. **Créez une base PostgreSQL** et copiez son URL de connexion (projet Supabase,
   Neon ou Railway indifféremment).

2. **Variables d'environnement du projet Vercel**, avec la portée
   **« All Environments »** (build **et** exécution) :

   | Variable | Valeur |
   | --- | --- |
   | `DATABASE_PROVIDER` | `postgresql` |
   | `DATABASE_URL` | URL du **pooler en mode transaction** (voir étape 4) |
   | `AUTH_SECRET` | `openssl rand -base64 32` |
   | `AUTH_URL` | `https://<domaine>.vercel.app` |
   | `NEXT_PUBLIC_APP_URL` | `https://<domaine>.vercel.app` |
   | `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | (optionnel) connexion Google |

   > `DATABASE_PROVIDER` est la variable la plus critique du projet : elle choisit
   > le schéma Prisma utilisé par `prisma generate` **pendant le build**. Si elle
   > manque au build, le client généré est un client SQLite déployé sur une base
   > Postgres, et chaque page qui lit la base échoue avec une erreur
   > « An error occurred in the Server Components render ». Le build **s'interrompt
   > avec un message explicite** dans ce cas : c'est le signal qu'il manque la
   > variable à la portée Build.

3. **Appliquez le schéma et chargez le contenu depuis votre machine** :

   ```bash
   # Windows PowerShell
   $env:DATABASE_PROVIDER="postgresql"
   $env:DATABASE_URL="<url postgres>"
   npm run db:push
   npm run db:seed
   ```

   Le projet n'a **pas de dossier `prisma/migrations`** : `db:push` est donc la
   seule voie, et il n'est pas idempotent dans le temps. **Relancez `db:push`
   après chaque commit qui modifie `prisma/schema.prisma`**, sinon les tables
   ajoutées n'existent pas en production et les pages correspondantes plantent
   au rendu. Lorsqu'un déploiement de contenu concerne uniquement la
   compréhension orale, préférez le seed ciblé
   (`SEED_LISTENING_ONLY=1`) pour ne pas toucher aux données existantes.

4. **Utilisez l'URL du pooler en mode transaction**, et non la connexion
   directe : Supabase n'expose cette dernière qu'en IPv6, que Vercel ne supporte
   pas. Et **surtout pas le mode session**.

   | Mode | Port | Usage |
   | --- | --- | --- |
   | transaction | `6543` | **Obligatoire** pour Vercel |
   | session | `5432` | Réservé à `db:push` / `DIRECT_URL` |

   ```bash
   DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
   ```

   En mode session, PgBouncer réserve un vrai backend PostgreSQL par connexion
   cliente jusqu'à la fermeture de la session, et le pool total est borné à une
   quinzaine de connexions. Or chaque fonction serverless garde son module en
   mémoire entre deux requêtes, donc son propre pool Prisma : quelques fonctions
   tièdes suffisent à saturer le pooler, et le site tombe en `EMAXCONNSESSION`.
   Le mode transaction multiplexe au contraire de nombreuses clientes sur les
   mêmes backends. `pgbouncer=true` désactive les requêtes préparées,
   incompatibles avec ce mode.

   `connection_limit=1` évite qu'une instance tiède consomme le pool à elle
   seule ; le code l'ajoute de lui-même en serverless si la variable ne le
   définit pas.

5. **Importez le projet dans Vercel**. Le build utilise `npm run build`, qui
   exécute `prisma generate` avec le schéma PostgreSQL, puis `next build`.

> `sharp` est aujourd'hui dans `devDependencies` alors que `next/image` en a
> besoin à l'exécution pour optimiser les images. Si les images ne sont pas
> optimisées en production, déplacez `sharp` dans `dependencies` et régénérez le
> lockfile avec la même version de npm que celle utilisée pour `npm install`.

## Vérifier un déploiement

Si une page affiche « An error occurred in the Server Components render »,
l'erreur réelle est dans les logs du déploiement Vercel (onglet **Logs**),
jamais dans la console du navigateur. Vérifiez dans l'ordre :

1. `DATABASE_PROVIDER` est bien définie à la portée Build ;
2. le schéma a été poussé sur la base de production (`npm run db:push`) ;
3. `DATABASE_URL` pointe bien vers le pooler en IPv4 ;
4. `DATABASE_URL` est en **mode transaction** (port `6543`, `pgbouncer=true`).

Une entrée de log contenant `EMAXCONNSESSION` ou
`PrismaClientInitializationError: max clients reached in session mode` désigne
ce dernier point : le pooler en mode session est saturé. Basculez sur le
port `6543`.

## Avertissement

Projet d'entraînement, sans lien avec France Éducation International. Les
niveaux CECRL affichés sont des estimations pédagogiques.