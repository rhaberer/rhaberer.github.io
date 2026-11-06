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
- `imgs/`: original project photographs retained as source material; the site serves the optimised versions in `public/imgs/`.
- `instrumentation.ts`: Vercel OpenTelemetry registration.
- `app/api/health/route.ts`: uncached health response with a `portfolio.health` span.
- `docs/VERCEL.md`: deployment, monitoring, tracing, and verification.

Add a project in `lib/projects.ts`, put its media in `public/`, and add the media's width and height to `lib/media-dimensions.json`. Keep cover subjects fully visible. Project galleries use intrinsic dimensions and `object-fit: contain`; every image also opens at full size. All original portfolio photographs are represented.

## Repository cleanup

Next.js serves `app/` and `public/`. The retired Gauforum/GRÜNforum application, its assets and upload bundle, the old HTML/CSS and jQuery/Materialize libraries, and abandoned sphere-branding experiments have been removed. `/index.html` still redirects to `/` for existing links.

Original project photographs remain in `imgs/`; duplicate video and award-image files were removed from that directory because identical copies are served from `public/imgs/`. Root-anchored `.vercelignore` rules exclude source photographs without excluding the deployed images.

The removed upload bundle contained embedded Dropbox credentials. Removing it from the working tree does not revoke those credentials or remove them from earlier Git commits; the historical exposure still needs to be handled in Dropbox and, if needed, Git history.
