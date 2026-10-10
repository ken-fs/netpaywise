# Deploy — Cloudflare Workers (static assets)

takehomepal (repo: `ken-fs/netpaywise`) is a **static export** (`next.config.ts` → `output: "export"`).
`pnpm build` writes `out/`, and the `takehomepal` Worker serves it as static assets (`wrangler.jsonc`).

## Normal path: push to main

`.github/workflows/deploy.yml` runs on every push to `main`: install → test → build → check output →
write `/.well-known/deploy.txt` (= commit SHA) → `wrangler deploy` → confirm the live marker matches.
Repo secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.

Check what's live: `curl -s https://takehomepal.com/.well-known/deploy.txt` should equal `git rev-parse HEAD`.

## Manual (one-off)

```bash
pnpm build && npx wrangler deploy
```

A manual deploy is overwritten by the next push, so commit first.

## Domain

- Zone `takehomepal.com` on Cloudflare (NS daisy / lochlan), registrar Spaceship.
- `always_use_https` on, minimum TLS 1.2.
- `takehomepal.com` and `www.takehomepal.com` are Worker custom domains; www 301s to the apex.

## Before every tax year

Update `data/tax/us/<year>/federal.json` from the IRS inflation Rev. Proc. (October) and Publication 15
(December), then rerun `pnpm test`. See README.
