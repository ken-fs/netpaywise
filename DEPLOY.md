# Deploy — Cloudflare Pages

netpaywise is a **static export** (`next.config.ts` → `output: "export"`). The build
produces `out/`, which Cloudflare Pages serves directly. No SSR, no `next-on-pages`.

## Option A — Git integration (recommended, auto-deploys on push)

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Pick the repo `ken-fs/netpaywise`, branch `main`.
3. Build settings:
   | Setting | Value |
   |---|---|
   | Framework preset | **Next.js (Static HTML Export)** — or **None** |
   | Build command | `pnpm build` |
   | Build output directory | `out` |
   | Root directory | `/` |
4. Environment variables:
   | Name | Value |
   |---|---|
   | `NODE_VERSION` | `22` |
5. Save & Deploy. Every push to `main` rebuilds automatically.

pnpm is auto-detected from `pnpm-lock.yaml` + the `packageManager` field in `package.json`.
`.nvmrc` also pins Node 22.

## Option B — Wrangler CLI (manual, one-off)

```bash
pnpm build
npx wrangler login                 # first time only
npx wrangler pages deploy out --project-name netpaywise
```

## Custom domain

After the first deploy, in the Pages project → **Custom domains** → add
`netpaywise.com` (and `www`). Cloudflare handles TLS. If the domain's DNS is already
on Cloudflare, it's one click; otherwise point the nameservers/records as instructed.

## Notes

- `public/_headers` sets long cache on hashed assets + baseline security headers.
- `trailingSlash: true` means routes are served as `/path/index.html`; Cloudflare handles
  the redirect from `/path` automatically.
- ⚠️ Before going live: verify tax data (`data/tax/**` — most files are `verified:false`)
  and confirm the contact inbox. See README.
