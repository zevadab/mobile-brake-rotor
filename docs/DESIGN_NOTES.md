# Scroll design and pricing references

## Current direction — standards v2

The supporting photo set carries the visual story: component close-up at services, a driveway service scene at the process, and a customer conversation beside the personal-attention copy. The detailed hands/rotor shot appears in a small hero inset and the request dialog. Mobile uses subject-aware cropping and readable copy in normal flow.

The owner supplied site-standards-v2.md and the preferred photorealistic mechanic hero. SITE_STANDARDS.md now incorporates that direction plus existing operational standards. The illustrated Chevy truck sequence described below is historical and has been removed from the page.

The current hero restores the original mechanic/driveway photograph with a personal owner-operated message. Desktop pairs large typography and a directional dark overlay with a small brake-detail inset. Phones show the mechanic first, then copy and quote actions on black. A gentle image settle provides restrained motion; there is no pinned sequence or tire graphic. Responsive WebP delivery, reduced motion and a complete no-JavaScript opening remain required. See MOTION_DESIGN.md. No named identity or completed customer job is attributed to the supplied images.

The request journey is preferred Pacific date/time, vehicle details, inbox delivery, and personal SMS/WhatsApp follow-up. Delivery is prepared through a configurable HTTPS adapter but remains in preview until a real endpoint and business contacts are verified. See REQUEST_SETUP.md.

## Direction

Reference reviewed: https://escooter-booking.webflow.io/ (November 23, 2026).
Inspected the rendered desktop page at successive scroll positions, opened its newsletter dialog, and read its public interaction code.

Observed patterns: oversized product imagery, dark and accent-color panels with large corner radii, component callouts changing with scroll progress, and a click-triggered newsletter dialog. The reference uses Webflow interactions plus jQuery state changes at scroll thresholds; many navigation links open the same newsletter dialog.

Earlier adaptations used an SVG pickup and then a photographic wheel with scroll-driven transitions. Both are retired at the owner's direction. The current version uses the supplied mechanic imagery and normal scrolling. No reference artwork or code was copied, and no vehicle-manufacturer affiliation is implied.

The popup is a native, click-triggered appointment-intake dialog. Real navigation remains functional. No automatic popup interrupts form entry. Newsletter collection is not implemented because the primary goal is service requests.

## Market ballparks

User requested competitor-based ranges. Public pages reviewed November 23, 2026:

- https://supercanic.com/blog/brake-job-cost — Riverside County guide: pads $200–$400 per axle; pads and rotors $350–$700 per axle.
- https://brakestogo.com/services/brake-pad-replacement/ — advertised pads $195, pads and rotors $429–$589, front or rear.
- https://supercanic.com/services/brake-service — labor starts at $150 per axle, $200 for trucks/imports, parts additional. This labor-only offer is not treated as a total price.

The homepage uses the Riverside County budgeting ranges for parts/labor. They are visibly market benchmarks rather than our fixed offers. Exact pricing, taxes, travel, vehicle conditions and parts are reviewed individually. Fluid service and inspection receive individual quotes rather than invented ranges.

## Integration boundary

The form remains a clearly labeled preview with no backend, no email delivery and no appointment confirmation. Phone and text buttons explain that the business number is pending instead of dialing placeholder strings. Replace these controls and the form adapter when verified business contact details and a submission provider are available.

Public deployment is restricted to website assets and metadata in dist; screenshots and repository documentation are not deployed.
