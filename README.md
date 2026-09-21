# Personal Portfolio Template

A restrained, responsive portfolio built with Next.js App Router, TypeScript, Tailwind CSS, and Lucide. Content lives in typed data modules. The homepage and case studies are Server Components; only navigation, the theme control, and contact form require client JavaScript.

All identity, career, education, and project content is placeholder material. The projects are fictional examples, and `hello@example.com` is not a real contact address. Replace the data and sample PDF before publishing.

## Development

Requires Node.js 22 LTS and npm. Docker is optional for local development.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. On PowerShell, use `Copy-Item .env.example .env.local`.

## Production build

```bash
npm run lint
npm run typecheck
npm run format:check
npm run build
npm start
```

`npm start` copies public and static assets into the standalone output and starts the generated production server. Docker prepares those files during the image build and runs the same server directly. Fonts are downloaded by `next/font` at build time, then served locally; the build needs access to Google's font endpoints. `npm run format` formats source and documentation. Commit the lockfile and use `npm ci` for repeatable installs.

## Content and architecture

```text
src/
  app/                  Routes, metadata, SEO, global styles
    api/contact/        Validated server-side mail endpoint
    api/health/         Container health endpoint
    projects/[slug]/    Static case-study pages
  components/
    layout/             Navigation, footer, theme control
    sections/           Homepage sections and contact form
    experience/         Reusable experience card
    projects/           Cards, grid, conceptual illustrations
    ui/                 Shared headings, badges, social links
  data/                 Portfolio content and configuration
  lib/                  Date helpers, validation, mail adapter
  types/                Shared TypeScript interfaces
public/resume/          Downloadable PDF
docs/                   Deployment instructions and Nginx example
```

Update `src/data/personal.ts` for name, location, email, resume path, education, and social URLs. GitHub and LinkedIn links remain hidden until valid URLs are supplied. Change experience, projects, skills, and learning in their corresponding data files. Roles, dates, education, skills, and learning interests are placeholders. The About highlights use editable themes rather than invented experience statistics. The homepage can revalidate daily; rebuild when changing content.

Projects support optional context, approach, responsibilities, challenges, learnings, screenshots, repository, and live links. Empty sections and absent links are hidden. Add local images under `public/`; screenshot paths and alt text belong in project data. `next/image` renders configured screenshots and card images. The initial conceptual visuals are code-native illustrations of fictional sample projects.

The included PDF is a clearly labeled sample generated from placeholder data. Review it before applying, or replace `public/resume/sample-resume.pdf` with your own. Regenerate after data changes with `npm run resume`. Do not add employer-confidential information.

The design uses CSS tokens, shared components, subtle CSS entrance/hover effects, and reduced-motion support. There is no animation runtime or component-library dependency for interactions that native controls handle well. Light, dark, and system themes persist locally; blocked browser storage gracefully falls back to system preference.

## Environment variables

| Variable               | Purpose                                                                     | When needed       |
| ---------------------- | --------------------------------------------------------------------------- | ----------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin such as `https://yourdomain.com`, without a trailing slash | Build and runtime |
| `RESEND_API_KEY`       | Server-only Resend API key                                                  | Runtime, optional |
| `CONTACT_EMAIL`        | Address receiving contact submissions                                       | Runtime, optional |
| `CONTACT_FROM`         | Sender address on a Resend-verified domain                                  | Runtime, optional |

Never prefix secrets with `NEXT_PUBLIC_`. `.env` files are ignored by Git and excluded from the Docker build. The public origin is compiled into generated metadata: **rebuild when changing domains**, and use the same value at runtime. The default is localhost for local preview.

## Contact delivery

Set all three contact variables and verify the sender domain with Resend to enable delivery. The adapter in `src/lib/mail.ts` calls the [Resend email API](https://resend.com/docs/api-reference/emails/send-email) server-side. Swap this adapter to use another provider. No provider SDK or API key reaches the browser.

The form validates required fields, email syntax, and lengths both in the browser and on the server. The endpoint bounds request bodies, checks same-origin requests, rejects a honeypot field, limits provider calls to five submissions per minute per process, and times out upstream requests. Missing configuration or delivery failures return an honest error with a direct-email fallback; submissions are not stored. A success message means the provider accepted the request, not that the recipient has read it.

The process-wide limit is intentionally simple and resets on restart. For multiple replicas or public traffic at scale, use an edge rate limiter or a shared store. The Droplet Nginx example adds per-IP limits. On App Platform, put equivalent edge protection in front of the app before enabling high-volume public mail delivery. Cross-origin requests from a secondary domain should redirect to the configured canonical domain.

## Docker

```bash
docker build -t personal-portfolio .
docker run --rm -p 3000:3000 personal-portfolio
```

Open http://localhost:3000. For production:

```bash
docker build --build-arg NEXT_PUBLIC_SITE_URL=https://yourdomain.com -t personal-portfolio .
docker run -d --name portfolio --env-file .env.production -p 127.0.0.1:3000:3000 personal-portfolio
```

Create `.env.production` privately on the host; do not commit it. The three build stages install locked dependencies, build Next.js, and copy only standalone output, static assets, and public files into a Node Alpine runtime. No full source tree or development dependency installation is copied into the runtime. It runs as UID 1001 on port 3000, with a `/api/health` healthcheck. Standalone output is described in the [Next.js deployment documentation](https://nextjs.org/docs/app/getting-started/deploying).

Measure and inspect the actual image in an environment with Docker Engine running:

```bash
docker image inspect personal-portfolio --format='{{.Size}} bytes'
docker history personal-portfolio
docker run --rm --entrypoint id personal-portfolio
```

An exact image-size claim is intentionally omitted until the image is built. Refresh base images and review dependency updates regularly. Pin the tested base-image digest in your deployment pipeline when reproducibility across rebuilds is required.

## Docker Compose

```bash
docker compose up --build
```

Compose works without a local env file. For configured deployment, copy `.env.example` to `.env`, then edit it; Compose reads `.env` automatically. Next.js development uses `.env.local` instead. Compose binds only to `127.0.0.1:3000`, drops Linux capabilities, enables `no-new-privileges`, limits log growth, and restarts the service unless stopped. It does not add a database.

```bash
docker compose up -d --build
docker compose logs -f --tail=100
docker compose restart
docker compose down
```

## DigitalOcean deployment

See [the deployment guide](docs/deployment.md) for Ubuntu Droplet setup, Docker installation, DNS, Nginx, HTTPS, updates, and App Platform configuration. The application itself has no dependency on DigitalOcean-specific APIs or host configuration.

```text
Internet → domain → HTTPS / Nginx → loopback port 3000 → Next.js container
Git → Docker build → standalone server → registry → Droplet or App Platform
```

The same image can be tagged for DigitalOcean Container Registry, GitHub Container Registry, or Docker Hub. Do not bake runtime email credentials into the image.

## CI and release readiness

`.github/workflows/checks.yml` runs on pull requests, pushes to main, and manual dispatch. It installs locked dependencies, lints, checks TypeScript and formatting, builds Next.js, runs browser and accessibility tests, builds Docker, then checks container health, homepage response, runtime UID, and image size. This workflow does not publish images or deploy anything and needs no deployment credentials.

To add delivery later, use a separate manually triggered workflow after checks pass: authenticate with GitHub Secrets, build with the production public URL, tag an immutable commit SHA, push to the chosen registry, then update the target deployment. Use a protected GitHub environment for production approval. Do not put tokens, SSH keys, registry passwords, or private server access details in source files.

Run the browser regression suite with `npx playwright install chromium` followed by `npm run test:e2e` after building. On Windows with Edge installed, set `$env:PLAYWRIGHT_CHANNEL='msedge'` to use that browser instead. Tests cover responsive overflow, navigation, themes, accessibility with axe, route availability, and mocked contact-form states. They never send real email.

Before launch: review the generated resume, set real social URLs if desired, set the canonical domain before building, verify contact delivery using your account, and validate DNS/HTTPS and container health on your target host. Replace all sample content before publishing the portfolio as your own.
