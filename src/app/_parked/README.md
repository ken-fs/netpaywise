# Parked routes

Folders starting with `_` are private in the Next.js App Router, so nothing here is built or served.

These pages were cut from the 2026-10 launch (see `08-viability-2026-10.md`): their SERPs have no
independent sites in the top 10, or they depend on unverified state tax tables. To bring one back,
move its folder up to `src/app/`, add it to `src/app/sitemap.ts`, and link it from the home page.
