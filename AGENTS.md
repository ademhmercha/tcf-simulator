# AGENTS.md

TCF Simulator — Next.js 14 (App Router) exam prep app. French-only UI, Prisma 5 (SQLite local / PostgreSQL prod), Auth.js v5, next-intl. `README.md` is thorough (setup, deploy, PWA) — read its Deploy section before touching anything DB/production related.

## Commands

```bash
npm run verify          # typecheck && lint && test — run this before finishing
npm run typecheck       # tsc --noEmit (fast, incremental)
npm run lint            # next lint — only lints app/ components/ lib/ server/ config/ tests/
npx vitest run tests/unit/<file>.test.ts   # single test file
npm run build           # prisma generate + next build; FAILS if DATABASE_PROVIDER unset (by design)
```

- Tests are pure unit tests (`vitest`, node env, no DB, no browser). `npm run test:e2e` exists but there is **no playwright config and no e2e tests** — don't chase it.
- `scripts/` is typechecked but **not** linted; keep its style consistent manually.
- `npm install` requires `.npmrc` `legacy-peer-deps=true` (forced by @vercel/analytics peers). Don't remove it.

## Prisma: two schemas, one canonical

- `prisma/schema.prisma` is the **only** schema you edit (PostgreSQL, canonical).
- `prisma/schema.sqlite.prisma` is a **generated mirror** (header says so) — never hand-edit; regenerate with `npm run db:use:sqlite`.
- All Prisma CLI goes through `scripts/prisma.mjs` (`npm run db:*`), which selects the schema from `DATABASE_PROVIDER` and exits with an explicit error if it's missing/invalid or `sqlite`+Vercel. This is deliberate — `tests/unit/build-guards.test.ts` asserts it. Don't add a silent `sqlite` fallback.
- No `prisma/migrations` folder: `npm run db:push` is the only path and is not idempotent over time. **After changing `prisma/schema.prisma`, production needs a re-run of `db:push`.**
- Enums are `String` columns + Zod in `config/enums.ts` (no native Prisma enums) so both providers work — keep it that way.
- After changing the scoring bar (`config/scoring.ts` or `server/services/grading.ts`): run `npm run db:rescore` (`--dry-run` first) — scores are written once at submission.
- Local dev: `.env` from `.env.example` (`DATABASE_PROVIDER=sqlite`, `file:./dev.db`), then `npm run db:push && npm run db:seed`.

## Architecture

- `app/[locale]/` route groups: `(marketing)`, `(auth)`, `(app)` (dashboard/history/results/corrections/admin), `(exam)`. Locale prefix is always `/fr`.
- `app/api/exam/[sectionRunId]/{answer,submit,heartbeat}` — the exam is **server-authoritative**: timer, grading, and answers live server-side; the client only queues and replays answers. Never move grading or timing to the client.
- `middleware.ts` does i18n **and** the session guard. API routes are deliberately exempted from locale prefixing and from the cookie guard (each API route does its own `auth()`); don't "simplify" that away.
- `server/` = actions (`server/actions/`), domain services (`server/services/`), auth. `lib/` = shared utilities (`lib/db.ts` singleton, `lib/db-url.ts` pool URL, `lib/env.ts` zod env validation). `config/` = scoring, enums, site.
- Content source of truth: `data/tcf_practice_5_tests_250_questions.json`, loaded by `npm run db:seed`. `data/ce/` holds reading content modules.

## Conventions

- **Comments, commit messages, and UI strings are French** (conventional commits in French: `fix(grading): ...`). ASCII-safe French in scripts/tests is fine; app files use accented UTF-8.
- UI copy goes through `i18n/messages/{en,fr}.json` (next-intl); `fr` is the live locale, `en` is kept on disk.
- Throwaway diagnostic scripts go in the repo root as `.tmp-*.cjs` (gitignored by pattern).
- PWA: if you change a cached public page, bump `VERSION` in `public/sw.js` so installed clients refresh.
- Regenerate branding only via `npm run icons:generate` (from root `logo.png`) — don't edit files under `public/brand/`, `public/icons/`, or `public/favicon.ico` by hand.
