# Photographic scroll hero

## Experience

One native sticky stage on black, below the site header:

1. Oversized centered wheel, with brake disc and caliper visible.
2. The wheel enlarges and fades as a circular mask reveals the supplied brake-service close-up.
3. A horizontal wipe reveals the supplied mechanic/driveway scene; the stage then releases into services.

The motion follows scroll position in both directions. It does not simulate a mechanically exact wheel disassembly. No autoplay, scroll interception, video, WebGL, or animation library is required. The effect is controlled by hero-motion.js, with CSS in styles.css.

The runway is 300 small viewport heights on desktop and 230 on phones, shortening the swipe distance to services. Quote and pricing links bypass it. Small viewport height units keep mobile browser toolbar changes from jumping the scene. The stage measures the actual header and mobile action bar, including safe-area insets, instead of assuming their heights. Reduced motion or disabled JavaScript removes the runway and later scenes. A single semantic h1 describes the service; changing visual captions and duplicate photos are hidden from assistive technology.

Phone layouts use a less cropped wheel, larger captions, 48-pixel hero action targets and a swipe cue. The bottom action bar hides while a quote field has focus so it does not compete with the software keyboard; form fields retain 16-pixel text. Later hero photos have low fetch priority so the opening wheel loads first. After scroll progress reaches either end, the animation skips redundant style writes while visitors use the rest of the page.

## Asset and prompt

Generated with the built-in image-generation tool, new image mode, transparent background. Original: assets/motion/wheel-front.png. Responsive derivatives: wheel-front-640.webp, wheel-front-960.webp, wheel-front-1280.webp (approximately 68 / 144 / 200 KB). The original is preserved; Sharp only resizes and encodes the WebP derivatives.

Exact prompt:

> Use case: product-mockup. Create a photorealistic premium automotive product photograph for a black website's full-screen scroll animation. One single domestic pickup truck wheel and tire assembly, EXACT straight-on front view, circular face centered precisely in a square image, outer tire occupies 90 percent of image height. Black rubber all-season tire with authentic restrained tread and clean sidewalls (no lettering). Six-spoke brushed graphite alloy rim, realistic machined metal, visible silver brake disc behind the open spokes and one small safety orange caliper at right. Symmetrical perspective, optical axis through wheel hub, no tilted camera. Studio softbox lighting plus subtle white edge light for visibility against black. Very realistic material textures and mechanical proportions. Isolated on a genuinely transparent background; no ground, no background, no scenery, no text, no badges, no logo, no watermark. The entire tire must fit in frame with 5 percent transparent padding all around. This is a real-looking automotive component photograph, NOT an illustration, not cartoon, not stylized toy.

Later scenes use the supplied brake-service-detail-owner-operator.png and hero-owner-operator-rugged-mechanic.png through existing responsive derivatives. The photography remains illustrative brand material, not evidence of a specific customer job or exact vehicle specification.

## Verification

Use local Playwright browser checks at desktop, narrow phone, and landscape sizes. Verify all three scenes, reverse scrolling, a stable pinned stage, visible quote controls, no horizontal overflow, usable services skip link, dynamic reduced-motion preference changes, and a usable no-JavaScript opening. Confirm images and hero-motion.js load from the deployed site.

GitHub Pages explicitly includes hero-motion.js in its static artifact. Forms and business-contact configuration remain governed by REQUEST_SETUP.md.
