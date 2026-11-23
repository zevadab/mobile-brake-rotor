# Owner-led photographic hero

## Current experience

The owner has retired the tire-centered pinned sequence and returned to the original mechanic photograph.

- Desktop: the driveway scene fills the opening, with large left-aligned copy, a directional dark overlay and warm neutral highlights.
- Phone: the mechanic photograph comes first, followed by copy, quote/pricing actions and a compact service-detail link in normal document flow.
- A small brake-detail photo links to the service process. It adds variation without competing with the mechanic.
- Motion is a one-time 1.025-to-1 photo settle and existing section reveals. Reduced-motion visitors get a static image.
- The page has no pinned hero, scroll runway, scroll interception, or dedicated hero JavaScript. Content remains visible without JavaScript.

The main image uses the supplied hero-owner-operator-rugged-mechanic.png through responsive WebP derivatives. The inset uses brake-service-detail-owner-operator-480.webp. The imagery remains illustrative brand material, not evidence of a specific customer job.

## Verification and deployment

Check English and Spanish pages in Chromium and WebKit at desktop, 320px phones, the iPhone 16 Pro viewport and landscape. Verify photo cropping, readable copy, non-overlapping actions, natural scrolling, reduced motion and the no-JavaScript opening. Confirm that neither wheel-front images nor hero-motion.js are requested.

GitHub Pages runs scripts/build-site.mjs to package public assets. Both language pages reference content-hashed CSS and JavaScript so newly fetched markup does not reuse an older cached stylesheet. Run node scripts/build-site.mjs and node --test tests/build-site.test.mjs before publishing.

Forms and business-contact configuration remain governed by REQUEST_SETUP.md.

## Archived wheel asset provenance

The former wheel sequence and its runtime were removed at the owner's request. Its source and derivatives remain in design/archive/tire-hero/ for provenance; neither page uses them and the build does not publish them.

Generated with the built-in image-generation tool, new image mode, transparent background. Original: design/archive/tire-hero/wheel-front.png. Responsive derivatives: wheel-front-640.webp, wheel-front-960.webp, wheel-front-1280.webp. Sharp only resized and encoded those derivatives.

Original generation prompt:

> Use case: product-mockup. Create a photorealistic premium automotive product photograph for a black website's full-screen scroll animation. One single domestic pickup truck wheel and tire assembly, EXACT straight-on front view, circular face centered precisely in a square image, outer tire occupies 90 percent of image height. Black rubber all-season tire with authentic restrained tread and clean sidewalls (no lettering). Six-spoke brushed graphite alloy rim, realistic machined metal, visible silver brake disc behind the open spokes and one small safety orange caliper at right. Symmetrical perspective, optical axis through wheel hub, no tilted camera. Studio softbox lighting plus subtle white edge light for visibility against black. Very realistic material textures and mechanical proportions. Isolated on a genuinely transparent background; no ground, no background, no scenery, no text, no badges, no logo, no watermark. The entire tire must fit in frame with 5 percent transparent padding all around. This is a real-looking automotive component photograph, NOT an illustration, not cartoon, not stylized toy.
