# The Mobile Brake & Rotor Guy

English and Spanish mobile brake-service website, published from `main` through GitHub Pages at https://themobilebrakerotorguy.com.

## Project layout

```text
src/
  index.html              English page template
  styles/styles.css       Responsive styles
  scripts/script.js       Navigation, dialogs and request form
  scripts/site-config.js  Public contact and endpoint settings
  i18n/es.json             Spanish translations
public/
  assets/brand/           Logos used by the website
  assets/photography/     Optimized website images
  CNAME                   Custom domain
  robots.txt
  sitemap.xml
design/
  originals/              Original photos and additional brand artwork
  archive/tire-hero/       Retired tire assets, retained for reference
docs/                     Standards, brand notes and setup instructions
scripts/                  Static build and Spanish rendering
tests/                    Build, translation and asset checks
.github/workflows/        GitHub Pages deployment
dist/                     Generated website; ignored by Git
.cache/                   Local QA scripts, screenshots and tools; ignored
```

## Build and preview

Use Node.js 22 or newer. The build and tests use Node's standard library; no package installation is required.

```sh
node scripts/build-site.mjs
node --test tests/build-site.test.mjs
python -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open http://localhost:4173/ for English or http://localhost:4173/es.html for Spanish. Rebuild after changing source files. Serve `dist/`, not the repository root or `src/`.

The build replaces only this project's generated `dist/` directory. It generates both pages, adds content hashes to CSS and JavaScript filenames, and copies the explicit public assets. Design originals, archives, documentation and QA files are never deployed.

## Where to make changes

- Page content: [src/index.html](src/index.html). Keep the matching Spanish copy in [src/i18n/es.json](src/i18n/es.json); the build rejects missing page translations.
- Appearance: [src/styles/styles.css](src/styles/styles.css).
- Business phone, WhatsApp, email and intake endpoint: [src/scripts/site-config.js](src/scripts/site-config.js). These settings are public; never add credentials.
- Images: place optimized files in `public/assets/`, and retain source artwork in `design/originals/`. HTML uses published URLs such as `assets/photography/hero-1440.webp`.
- Request delivery: follow [docs/REQUEST_SETUP.md](docs/REQUEST_SETUP.md). The form remains in preview until a real endpoint is connected and verified.

Read [site standards](docs/SITE_STANDARDS.md), [brand guidelines](docs/BRAND_GUIDELINES.md), [design notes](docs/DESIGN_NOTES.md), [hero treatment](docs/MOTION_DESIGN.md), and [photography notes](docs/PHOTOGRAPHY.md) before changing those areas.

## Deployment

Push approved work to `main`. The [Pages workflow](.github/workflows/pages.yml) builds the site, runs the checks and uploads only `dist/`. The public English/Spanish URLs, domain configuration and optimized-image URLs remain unchanged by this reorganization.

The deployment job depends on the build job. If deployment needs a retry, rerun the failed deployment job so GitHub can reuse the completed build artifact.
