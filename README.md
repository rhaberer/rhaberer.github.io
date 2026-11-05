# Ronny Haberer — portfolio

A responsive, image-led portfolio built with Next.js App Router, TypeScript, and Three.js. The homepage is a showcase: minimal copy, a configurable cube assembly based on the original GitHub avatar, a filterable project index, a short background note, and contact.

## Local development

Use Node 24 LTS (the Vercel project also uses 24.x).

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. Public telemetry is off unless explicitly enabled in your environment. Copy `.env.example` to `.env.local` if you want the documented public configuration locally; never commit `.env.local`.

```sh
npm test
npm run typecheck
npm run build
npm run start
```

`npm run format` formats the application source.

## Structure

- `app/page.tsx`: minimal homepage, work index, context, contact.
- `app/work/[slug]/page.tsx`: static project pages; imagery comes before project notes.
- `lib/projects.ts`: project descriptions, categories, credits, and gallery order.
- `lib/media-dimensions.json`: intrinsic media dimensions to reserve the correct image space.
- `components/study.tsx`: lazily loaded Three.js cube assembly. Material, separation, outline, rotation, pause, and reset controls. Reduced motion is respected; rendering pauses out of view and in background tabs.
- `public/imgs`: WebP photographs, rotated to their correct orientation with EXIF metadata removed. Original video and award mark retained.
- `public/identity/github-avatar.svg`: faithful vector rebuild of the original avatar.
- `public/identity/cube-mark.svg`: the same linework with a transparent background.
- `public/identity/spherical-motif.svg`: secondary coral background motif.
- `instrumentation.ts`: Vercel OpenTelemetry registration.
- `app/api/health/route.ts`: uncached health response with a `portfolio.health` span.
- `docs/VERCEL.md`: deployment, monitoring, tracing, and verification.

Add a project in `lib/projects.ts`, put its media in `public/`, and add the media's width and height to `lib/media-dimensions.json`. Keep cover subjects fully visible. Project galleries use intrinsic dimensions and `object-fit: contain`; every image also opens at full size. All original portfolio photographs are represented.

## Existing files

The original HTML, CSS, vendor files, and source media remain at the repository root as migration references. Next.js serves `app/` and `public/`. `.vercelignore` excludes the legacy application from CLI source uploads. `/index.html` redirects to `/`. The GRÜNforum project is omitted from the new portfolio.

The old GRÜNforum browser bundle contains embedded Dropbox credentials. It is deliberately excluded from the new public site. Revoke the exposed credentials in Dropbox and review the old GitHub Pages deployment and Git history. A client-only bundle cannot safely hold a refresh token or client secret. The old upload service has not been migrated.
