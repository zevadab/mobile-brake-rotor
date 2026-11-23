# Scroll design and estimate messaging

## Current direction — standards v2

The supporting photo set carries the visual story: component close-up at services, a driveway service scene at the process, and a customer conversation beside the personal-attention copy. The detailed hands/rotor shot appears in a small hero inset. Mobile uses subject-aware cropping and readable copy in normal flow.

The owner supplied site-standards-v2.md and the preferred photorealistic mechanic hero. SITE_STANDARDS.md now incorporates that direction plus existing operational standards. The illustrated Chevy truck sequence described below is historical and has been removed from the page.

The current hero restores the original mechanic/driveway photograph with a personal owner-operated message. Desktop pairs large typography and a directional dark overlay with a small brake-detail inset. Phones show the mechanic first, then copy and WhatsApp/Messenger actions on black. A gentle image settle provides restrained motion; there is no pinned sequence or tire graphic. Responsive WebP delivery, reduced motion and a complete no-JavaScript opening remain required. See MOTION_DESIGN.md. No named identity or completed customer job is attributed to the supplied images.

The contact journey now goes directly to WhatsApp or Facebook Messenger. WhatsApp is connected to the owner's business short link; Messenger remains visibly coming soon until its destination is supplied. The contact form, date picker and booking dialogs have been removed. See REQUEST_SETUP.md.

## Direction

Reference reviewed: https://escooter-booking.webflow.io/ (November 23, 2026).
Inspected the rendered desktop page at successive scroll positions, opened its newsletter dialog, and read its public interaction code.

Observed patterns: oversized product imagery, dark and accent-color panels with large corner radii, component callouts changing with scroll progress, and a click-triggered newsletter dialog. The reference uses Webflow interactions plus jQuery state changes at scroll thresholds; many navigation links open the same newsletter dialog.

Earlier adaptations used an SVG pickup and then a photographic wheel with scroll-driven transitions. Both are retired at the owner's direction. The current version uses the supplied mechanic imagery and normal scrolling. No reference artwork or code was copied, and no vehicle-manufacturer affiliation is implied.

The reference popup was explored in an earlier version. The owner has since removed intake dialogs and forms in favor of direct messaging; no newsletter or automatic popup is included.

## Free estimates and fair pricing

The owner has replaced published competitor price ranges with free estimates and fair pricing tailored to each vehicle and service need. Do not restore ballpark figures, fixed prices, competitor comparisons or the old source disclosure.

Hero and service actions lead to messaging for a free estimate. Inspection and repair are not described as free; any inspection, service, tax or travel charges are discussed before work begins. Quotes and timing are confirmed personally after reviewing the vehicle and required work.

## Integration boundary

No on-site intake endpoint or customer storage remains. The build turns verified public contact settings into native WhatsApp/Messenger links, usable without JavaScript. Missing settings stay disabled and visibly labeled coming soon. The business confirms quotes and appointments within the chosen conversation.

Public deployment is restricted to website assets and metadata in dist; screenshots and repository documentation are not deployed.
