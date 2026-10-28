# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

TCF Simulator — Next.js 14 (App Router) exam prep app. French-only UI, Prisma 5 (SQLite local / PostgreSQL prod), Auth.js v5, next-intl. `README.md` is thorough (setup, deploy, PWA) — read its Deploy section before touching anything DB/production related. `AGENTS.md` holds the same project rules; keep both consistent.

## Commands

```bash
npm run verify          # typecheck && lint && test — run this before finishing
npm run typecheck       # tsc --noEmit
npm run lint            # next lint — only lints app/ components/ lib/ server/ config/ tests/
npx vitest run tests/unit/<file>.test.ts   # single test file
npm run build           # prisma generate + next build; FAILS if DATABASE_PROVIDER unset (by design)
```

- Local dev: copy `.env.example` to `.env` (`DATABASE_PROVIDER=sqlite`, `file:./dev.db`), then `npm run db:push && npm run db:seed && npm run dev`.
- Tests are pure unit tests (`vitest`, node env, no DB, no browser). `npm run test:e2e` exists but there is no playwright config and no e2e tests — ignore it.
- `tests/unit/build-guards.test.ts` is slow (~15s): it spawns the real `scripts/prisma.mjs`. Not a hang.
- `scripts/` is typechecked but not linted; keep its style consistent manually.
- `npm install` needs `.npmrc` `legacy-peer-deps=true` (forced by @vercel/analytics peers). Don't remove it.

## Prisma: two schemas, one canonical

- `prisma/schema.prisma` (PostgreSQL) is the only schema you edit. `prisma/schema.sqlite.prisma` is a generated mirror — never hand-edit; regenerate with `npm run db:use:sqlite`.
- All Prisma CLI goes through `scripts/prisma.mjs` (`npm run db:*`), which picks the schema from `DATABASE_PROVIDER` and errors explicitly if missing/invalid or `sqlite` on Vercel. Deliberate (asserted by `build-guards.test.ts`) — don't add a silent sqlite fallback.
- No `prisma/migrations`: `npm run db:push` is the only path. After changing `schema.prisma`, production needs a re-run of `db:push`.
- Enums are `String` columns + Zod in `config/enums.ts` (no native Prisma enums) so both providers work.
- After changing the scoring bar (`config/scoring.ts` or `server/services/grading.ts`) run `npm run db:rescore` (`--dry-run` first) — scores are written once at submission.

## Architecture

- `app/[locale]/` route groups: `(marketing)`, `(auth)`, `(app)` (dashboard/history/results/corrections/admin), `(exam)`. Locale prefix is always `/fr`.
- **Exam is server-authoritative**: `app/api/exam/[sectionRunId]/{answer,submit,heartbeat}` — timer, grading and answers live server-side; the client only queues and replays answers. Never move grading or timing client-side.
- `middleware.ts` does i18n and the session guard. API routes are deliberately exempt from locale prefixing and the cookie guard (each calls `auth()` itself) — don't "simplify" that. `/tests` and `/vocabulaire` are in `PROTECTED_PREFIXES`; guessable PDFs under `/pdf/...` have a separate cookie-guard matcher (the general matcher excludes dotted paths). Pages re-check `auth()` as the authoritative guard.
- `server/` = actions (`server/actions/`), domain services (`server/services/`), auth. `lib/` = shared utilities (`lib/db.ts` singleton, `lib/db-url.ts` pool URL, `lib/env.ts` zod env validation). `config/` = scoring, enums, site.
- Content source of truth: `data/tcf_practice_5_tests_250_questions.json`, loaded by `npm run db:seed`. `data/co/` (oral series) is read directly by the seed; `data/ce/` (reading modules) is compiled into the JSON by `npm run content:reading` — editing `data/ce/*.ts` alone changes nothing until you run it. Checks: `content:reading:check` (dry run), `content:check`, `content:encoding`, `content:reading:verify` (needs DB).
- Vocabulary series are static PDFs, no DB: put files in `public/pdf/vocabulaire/` and register them in `data/vocabulaire.ts` (one serie can have several documents shown as tabs). The viewer embeds them same-origin, which needs the `X-Frame-Options: SAMEORIGIN` override in `next.config.mjs` (global default is `DENY`). `tests/unit/vocabulaire.test.ts` checks manifest ↔ files. UI strings live in the `vocab:` i18n namespace.

## Conventions

- Comments, commit messages and UI strings are in French (conventional commits in French: `fix(grading): ...`). ASCII-safe French in scripts/tests is fine; app files use accented UTF-8.
- UI copy goes through `i18n/messages/{en,fr}.json` (next-intl); `fr` is live, `en` is kept on disk.
- Throwaway diagnostic scripts go in the repo root as `.tmp-*.cjs` (gitignored).
- PWA: if you change a cached public page, bump `VERSION` in `public/sw.js` so installed clients refresh.
- Regenerate branding only via `npm run icons:generate` (from root `logo.png`); don't hand-edit `public/brand/`, `public/icons/` or `public/favicon.ico`.
