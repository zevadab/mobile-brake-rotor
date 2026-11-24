# The Mobile Brake & Rotor Guy

English and Spanish mobile brake-service website, published from `main` through GitHub Pages at https://themobilebrakerotorguy.com.

## Project layout

```text
src/
  index.html              English page template
  styles/styles.css       Responsive styles
  scripts/script.js       Navigation and section reveals
  scripts/site-config.js  Public business chat destinations
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
- WhatsApp Business short link or number and Facebook Messenger URL: [src/scripts/site-config.js](src/scripts/site-config.js). These settings are public; never add credentials.
- Images: place optimized files in `public/assets/`, and retain source artwork in `design/originals/`. HTML uses published URLs such as `assets/photography/hero-1440.webp`.
- Messaging setup: follow [docs/REQUEST_SETUP.md](docs/REQUEST_SETUP.md). WhatsApp is connected to the owner's business short link. Messenger remains unconfigured and labeled coming soon. Add its verified destination and rebuild to activate it; no contact form or backend is used.
- Google reviews: `googleReviewsUrl` in the same configuration links the footer rating to the owner's listing. The rating is a dated, manually maintained snapshot; there is no live review widget. Confirmed payment methods are informational, with arrangements made in chat.

Read [site standards](docs/SITE_STANDARDS.md), [brand guidelines](docs/BRAND_GUIDELINES.md), [design notes](docs/DESIGN_NOTES.md), [hero treatment](docs/MOTION_DESIGN.md), and [photography notes](docs/PHOTOGRAPHY.md) before changing those areas.

## Browser audit

The optional audit checks English and Spanish in Chromium and WebKit at phone, tablet, landscape and desktop sizes. It covers native WhatsApp links, unavailable Messenger states, keyboard navigation, FAQ controls, enlarged text, reduced motion, script-free navigation and automated accessibility checks. It intercepts WhatsApp navigation locally and never sends a message.

Install audit tools into the ignored cache folder, keeping them out of production:

```sh
npm install --prefix .cache/audit-tools --no-save --ignore-scripts playwright axe-core
node .cache/audit-tools/node_modules/playwright/cli.js install chromium webkit
```

Build and serve `dist/` using the preview commands above, then run `node tests/browser-audit.cjs`. Set `AUDIT_BASE_URL` if the local preview uses a different address. Results are written to `.cache/audit-results.json`. Automated checks supplement real-phone and assistive-technology review; they are not a certification of accessibility or live account delivery.

## Deployment

Push approved work to `main`. The [Pages workflow](.github/workflows/pages.yml) builds the site, runs the checks and uploads only `dist/`. The public English/Spanish URLs, domain configuration and optimized-image URLs remain unchanged by this reorganization.

The deployment job depends on the build job. If deployment needs a retry, rerun the failed deployment job so GitHub can reuse the completed build artifact.
