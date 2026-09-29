# TCF Simulator

Plateforme d'entraînement au **TCF Tout public** (France Éducation International) :
5 tests blancs complets, chronomètre serveur, reprise de tentative, correction
détaillée et estimation de niveau CECRL.

- Interface en français (`/fr`)
- Reprise automatique d'une épreuve en cours, à la question près
- Chronomètre autoritaire côté serveur, aucune bonne réponse envoyée au client pendant l'épreuve
- PWA installable, consultable hors ligne pour les pages publiques
- SQLite en local, PostgreSQL pour la production

## Stack

| | |
|---|---|
| Framework | Next.js 14 (App Router, route groups) |
| Langage | TypeScript (strict) |
| Style | Tailwind CSS + variables de thème |
| i18n | next-intl 3 (`/fr` uniquement) |
| Base | Prisma 5 — SQLite (local) / PostgreSQL (prod) |
| Auth | Auth.js v5 (Credentials + Google) |
| Icônes PWA | générées par `scripts/generate-icons.mjs` |

## Démarrage local

```bash
npm install
cp .env.example .env
npm run db:push      # crée le schéma SQLite
npm run db:seed      # contenu + comptes de démonstration
npm run dev
```

Comptes créés par le seed :

| Rôle | Identifiant | Mot de passe |
|---|---|---|
| Administrateur | `admin@tcf-simulator.local` | `Admin!2345` |
| Candidat | `candidat@tcf-simulator.local` | `Candidat!2345` |

> Changez ces mots de passe avant toute mise en ligne (`SEED_ADMIN_PASSWORD`,
> `SEED_DEMO_PASSWORD`), ou supprimez le compte de démonstration.

## Variables d'environnement

| Variable | Rôle |
|---|---|
| `DATABASE_PROVIDER` | `sqlite` (défaut) ou `postgresql` |
| `DATABASE_URL` | `file:./dev.db` ou une URL PostgreSQL |
| `AUTH_SECRET` | secret de signature des JWT (32 octets minimum) |
| `AUTH_URL` | URL publique de l'application |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | optionnel, connexion Google |
| `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` | compte administrateur du seed |
| `SEED_DEMO_EMAIL` / `SEED_DEMO_PASSWORD` | compte candidat du seed |
| `TCF_SOURCE_JSON` | source d'import du contenu |

`scripts/prisma.mjs` sélectionne le schéma Prisma à partir de
`DATABASE_PROVIDER` : `npm run db:use:sqlite` / `npm run db:use:postgres`
basculent les schémas maintenus en parallèle.

## Scripts

```bash
npm run dev            # serveur de développement
npm run build          # prisma generate + next build
npm run verify         # typecheck + lint + tests

npm run db:push        # applique le schéma
npm run db:seed        # contenu + comptes
npm run db:reset       # réinitialise la base locale
npm run db:studio      # inspecter la base

npm run import:tests   # importe data/*.json
npm run import:csv     # importe un CSV
npm run export:csv     # export CSV
npm run admin:create   # crée un administrateur
npm run icons:generate # régénère les icônes PWA
```

## PWA

Le service worker (`public/sw.js`) applique une politique volontairement
conservatrice, car l'épreuve est autoritaire côté serveur :

- **cache** : pages publiques (`/fr`, `/fr/tests`, connexion) et ressources statiques ;
- **jamais en cache** : `/api/*`, l'épreuve, les résultats, le tableau de bord,
  l'historique et l'espace d'administration ;
- les requêtes non-`GET` (sauvegarde de réponse, soumission) ne sont jamais interceptées.

Une coupure réseau pendant une épreuve ne perd donc aucune réponse : le client
met en file d'attente et rejoue au retour du réseau.

Pour forcer une mise à jour de la PWA, incrémentez `VERSION` dans
`public/sw.js` : les clients reçoivent alors la notification « Actualiser ».

## Déploiement (Vercel)

Vercel ne dispose pas d'un système de fichiers persistant : **SQLite n'y
fonctionne pas**. Utilisez PostgreSQL (Neon, Supabase, Vercel Postgres).

1. Créez une base PostgreSQL et copiez son URL de connexion.
2. Réglez les variables d'environnement du projet Vercel :
   - `DATABASE_PROVIDER=postgresql`
   - `DATABASE_URL=<url postgres>`
   - `AUTH_SECRET=<openssl rand -base64 32>`
   - `AUTH_URL=https://<domaine>.vercel.app`
   - `NEXT_PUBLIC_APP_URL=https://<domaine>.vercel.app`
3. Appliquez le schéma et chargez le contenu **depuis votre machine** :

```bash
$env:DATABASE_PROVIDER="postgresql"
$env:DATABASE_URL="<url postgres>"
npm run db:push
npm run db:seed
```

4. Importez le projet dans Vercel. Le build utilise `npm run build`, qui
   exécute `prisma generate` avec le schéma PostgreSQL.

## Contenu

Le contenu des tests provient de
`data/tcf_practice_5_tests_250_questions.json` : 5 tests, 10 sections,
250 questions, 1000 options, 50 documents, 400 minutes au total.

## Avertissement

Projet d'entraînement, sans lien avec France Éducation International.
Les niveaux CECRL affichés sont des estimations pédagogiques.
