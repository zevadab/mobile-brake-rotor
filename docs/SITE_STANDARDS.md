# The Mobile Brake & Rotor Guy — Premium Site Standards v2

## North star

The site should feel like a premium, owner-operated mobile service: one skilled professional personally coming to the customer, explaining the work clearly, and completing it with care.

It should feel personal—not like a fleet, franchise, lead marketplace, or generic repair-shop template.

## Reference direction

Use the reference site's strengths as inspiration for pacing and storytelling only:

- Oversized visual hero
- Strong product/service focal point
- Short, confident copy blocks
- Scroll-based progression through the service process
- Numbered sections and clear visual rhythm
- Smooth transitions between content sections
- Persistent, easy-to-find booking/contact action

Do not copy its layout, assets, text, branding, or visual identity. Adapt the pacing to a local automotive service business.

## New visual standard

Current website theme: black and charcoal surfaces with light text and restrained orange accents, per the owner's latest direction. This supersedes light page backgrounds. Use dark chat controls with visible boundaries and focus rings. Keep photographs natural and approved logos unchanged; a small light logo backplate is permitted for navy artwork legibility.

Prioritize premium photorealistic automotive photography over illustrations, cartoon graphics, or generic stock images.

Images should show:

- One owner-operator technician
- A rugged, experienced, approachable local mechanic
- Clean long-sleeve work shirt, dark jeans, durable boots, work hat, beard, and shop rag when appropriate
- One customer vehicle at a time
- Cars, trucks, and vans
- Realistic wheels, tires, brake rotors, calipers, tools, and service conditions
- Clean driveways, workplaces, or approved service locations
- Personal attention and careful inspection
- Southern California light and subtle Inland Empire context

Images should not show:

- Fleets of vehicles
- Multiple technicians unless specifically needed
- Corporate service centers
- Generic auto-shop interiors
- Racing imagery or exaggerated mechanical effects
- Fake logos or readable AI-generated text
- Unsafe lifting or roadside conditions

## Premium composition rules

- Use wide cinematic images with intentional negative space for copy.
- Use close-up component photography for rotors, pads, tires, and inspection details.
- Use human-centered process photography to reinforce trust.
- Keep the navy, orange, graphite, and neutral California palette consistent.
- Use orange sparingly as a visual signal for action and tools.
- Avoid filling every area of the screen; premium design needs breathing room.
- Use subtle depth, soft shadows, and restrained borders instead of decorative effects.

## Page experience

The homepage should tell a short visual story:

1. **Need help?** — The owner-operator working at a customer's truck leads the hero. Use the supplied driveway photograph, concise personal copy, and a small service-detail inset.
2. **What do we do?** — Clear brake and rotor services with a close-up brake image.
3. **How does it work?** — Request, confirm, and receive service at your location.
4. **Why choose us?** — Personal service, clear communication, and local coverage.
5. **Ready to request service?** — Direct WhatsApp and Facebook Messenger buttons.

## Motion and transitions

Use smooth, restrained transitions:

- Fade and slight upward reveal as sections enter the viewport
- Gentle image scale from 1.02 to 1.0 on load
- Subtle parallax only where it does not affect readability or performance
- Smooth hover states on service cards and buttons
- Numbered process steps that reveal sequentially
- Sticky mobile WhatsApp and Messenger actions

The owner's current direction is personal and photographic. The mechanic leads the opening, with subtle image settling and a small brake-detail inset for variation. The tire-centered hero and pinned scroll sequence are retired. Use natural document scrolling, short copy, and visible chat/pricing actions. Do not intercept touch, wheel, or keyboard scrolling.

Respect `prefers-reduced-motion`: disable the image settle and section reveals. The complete opening must remain usable without JavaScript. On phones, lead with the owner photograph, followed by readable copy and actions in normal flow; never constrain the content to a fixed viewport height. See MOTION_DESIGN.md for the current treatment and asset provenance.

## English and Spanish

- Display a visible English/Spanish switch and “Se habla español” availability message.
- English source is src/index.html. Spanish copy is maintained in src/i18n/es.json; scripts/render-spanish.mjs generates es.html during the build. Do not manually edit dist/es.html.
- Translate complete customer journeys: content, alt text, menus, chat availability, pricing qualifications and safety language. The build rejects untranslated new page text.
- Both English and Spanish pages link to the same verified business accounts. Customers can discuss their preferred language in the chat.
- Both pages require correct language metadata, canonical URLs and reciprocal hreflang links. Keep both in the sitemap.
- Test Spanish copy on narrow phones, including the owner hero, navigation and chat actions.
- For local bilingual review, run node scripts/build-site.mjs, then serve dist (for example: python -m http.server 4173 --bind 127.0.0.1 --directory dist). Serve the built site, not src/index.html or the repository root.

## Copy standard

Copy should be short, direct, and human.

Preferred language:

- “I come to you.”
- “Your vehicle, your location, your schedule.”
- “Clear recommendations before additional work.”
- “Brake-focused service for cars, trucks, and vans.”
- “Owner-operated service with personal attention.”

Avoid:

- “We are a leading national provider.”
- “Our fleet of technicians.”
- Corporate or franchise language
- Unverified guarantees, certifications, warranties, prices, 24/7 availability, or same-day claims
- Fear-based brake messaging

## Service hierarchy

### Core services

- Brake pads
- Brake rotors
- Brake fluid service
- Brake inspections
- Brake noise and vibration evaluation

### Select maintenance add-ons

- Oil changes
- Oil filters
- Cabin air filters
- Battery replacements

Always make clear that additional services depend on vehicle, parts, location, availability, and service conditions.

## Trust and request flow

The site must distinguish a request from a confirmed appointment.

The customer should understand:

- A message starts a conversation; opening a link does not send a message.
- Availability is reviewed manually.
- Vehicle and service fit must be confirmed.
- Pricing and final recommendations are confirmed after review or inspection.

## Technical quality bar

- Mobile-first and fast on a cellular connection
- High-quality images optimized for responsive delivery
- Lazy-load below-the-fold photography
- Use modern image formats where practical
- Preserve accessible contrast and visible focus states
- Keep mobile navigation usable without JavaScript. Closing an open menu with Escape returns focus to its toggle.
- Support enlarged text without clipping headings or chat controls; reserve enough space for the mobile action bar as its text grows.
- Serve display-sized logo and favicon derivatives instead of loading full-resolution artwork in the header or browser tab.
- Maintain semantic headings and labeled controls
- Keep WhatsApp and Messenger actions persistent on mobile
- No unnecessary video backgrounds or heavy animation libraries
- Keep service, vehicle, area, contact, and policy data configurable

## Asset direction

Use the following asset roles:

- `hero-owner-operator-brake-service.png` — primary hero or owner-operated story section
- `hero-owner-operator-rugged-mechanic.png` — preferred hero treatment with the rugged trusted-mechanic identity
- `owner-operator-truck-service.png` — process or trust section
- `brake-rotor-closeup.png` — brake service detail section
- `mobile-brake-process.png` — how-it-works or inspection section

Before printing vehicle graphics or using the logo at large physical sizes, recreate the approved mark as production vector artwork and confirm final typography, clear space, and color output.

## How these standards apply

The owner has returned to the personal mechanic hero with photographic variation. Both the illustrated truck sequence and later tire-centered pinned sequence are retired. The operational requirements below remain in effect. Keep the original brand logos unchanged.

## Mobile-first and local discovery standard

Assume most first visits come from a phone after a local Google search such as “brake service near me,” “mobile brake repair,” or “rotor replacement Inland Empire.” Mobile conversion and local trust take priority over decorative desktop treatments.

- Keep the primary WhatsApp and Messenger actions visible without requiring desktop navigation.
- Keep important copy, service area, and request controls near the top of the mobile experience.
- Use comfortable tap targets, readable text, clear chat destinations, and minimal typing wherever possible.
- Test the page at narrow phone widths before considering a feature complete.
- Include 320px phones, short screens, landscape and orientation changes. Keep hero actions at least 44px high, readable chat labels, and content clear of device safe areas. Verify the photo crop, readable copy and normal scrolling in Chromium and WebKit mobile emulation; real-device testing remains a useful release check.
- Keep page title, description, headings, service names, cities served, and structured data aligned with real services and confirmed coverage.
- Make the business name, service type, Inland Empire coverage, and contact action easy for both people and search engines to understand.
- Avoid keyword stuffing, city-list spam, hidden text, or claims that are not operationally true.
- Optimize images and scripts so a customer on a mobile network can reach the chat action quickly.
- Preserve a clear path from a Google Business Profile visit to a business chat.

## Primary customer path

Every page and feature should support this path:

1. **Recognize the need** — The customer sees a brake symptom or knows maintenance is due.
2. **Confirm fit** — They understand that we provide mobile brake and rotor service in their area.
3. **Request contact** — They share vehicle, symptom, location, and timing details in WhatsApp or Messenger.
4. **Confirm availability** — The business reviews the request and confirms whether the location, service, and requested time can be supported.
5. **Prepare for service** — The customer receives clear next steps, expectations, and safety guidance.
6. **Complete the visit** — The technician performs the agreed inspection or service and communicates any change in scope before additional work.

The site must distinguish a **request** from a **confirmed appointment**. A message never guarantees availability, price, diagnosis, or completion of service.

## Customer contact requirements

- The hero, contact section and mobile action bar each offer WhatsApp and Facebook Messenger.
- Remove on-site contact forms, date pickers, intake dialogs, automatic popups and email/SMS delivery adapters.
- Guide customers to share year, make, model, city, symptoms and preferred day within the chosen chat.
- The owner replies personally and confirms scope, pricing and appointment availability there.
- Public destinations belong in src/scripts/site-config.js. Never invent a phone number or business Page.
- Blank destinations remain native disabled buttons labeled “Coming soon” / “Próximamente.” Do not use dummy links or simulate successful delivery.
- A configured destination becomes a native link during the build, works without JavaScript, and clearly indicates opening a new tab.
- WhatsApp uses an owner-provided https://wa.me/message/BusinessCode short link or international business number; Messenger uses a verified https://m.me/PageUsernameOrId URL.
- Neither opening a chat nor sending a message guarantees an appointment or response time.

## Service and safety language

Use practical, honest language. Avoid claims that have not been confirmed by the business, including certifications, warranties, guaranteed pricing, 24/7 emergency availability, exact service radius, or “same-day” promises.

### Required distinction

- An **inspection** is an evaluation and does not automatically include repair.
- A **quote** is an estimate or conversation starter until the vehicle and service scope are confirmed.
- An **appointment request** is not a confirmed appointment.
- A **diagnosis** identifies likely causes based on available information; final findings may require an in-person inspection.

### Safety disclaimer

Use this or a reviewed equivalent wherever brake safety is discussed:

> If your brakes feel unsafe, fail to stop normally, pull severely, make grinding sounds, or show a warning light, avoid driving the vehicle and contact us or a qualified towing provider for guidance. The website cannot diagnose a vehicle remotely.

The disclaimer is guidance, not a substitute for emergency services or a professional in-person evaluation.

### Service-process disclaimer

Use this or a reviewed equivalent near the messaging buttons:

> Sending a message requests contact. It does not guarantee an appointment, availability, price, diagnosis, parts selection, or completion of service. Final recommendations and pricing are confirmed after reviewing the vehicle, requested work, location, and service conditions.

## Content standards

- Keep headings direct and useful to a customer scanning on a phone.
- Lead with the service benefit: mobile brake help at the customer’s location.
- Prefer “we’ll confirm” over unsupported certainty.
- Clearly label sample reviews, placeholder business data, and development-only content.
- Never publish fictional testimonials as real customer reviews.
- Show the owner's reported Google rating as a dated snapshot linked to the supplied listing. Add counts or individual quotes only when supplied or verified; never imply live synchronization.
- Display confirmed payment methods (Visa, credit cards, Zelle and cash) without adding an online checkout or requesting payment information on the website.
- Lead service copy with convenience: service at the customer's home or workplace, free estimates and direct personal contact. Service and estimate buttons open the configured business chat directly.
- Do not imply that every listed city is always available; invite customers to confirm coverage.
- Avoid fear-based copy, racing imagery, excessive technical jargon, and aggressive sales language.
- Keep WhatsApp and Messenger actions visible and easy to tap on mobile.

## Design and accessibility standards

- Maintain the navy, orange, charcoal, white, and light-gray brand system.
- Use strong contrast and visible focus states.
- Use semantic headings in logical order.
- Every chat control needs a visible platform label and an honest availability state.
- Touch targets should be comfortably tappable on small screens.
- Do not rely on color alone to communicate errors, success, or required actions.
- Keep motion subtle and respect `prefers-reduced-motion` when animations are added.
- Optimize for fast first load and avoid stock-photo-heavy pages.

## Feature roadmap

1. Keep the owner's WhatsApp Business short link connected and configure the Facebook Page Messenger URL when supplied.
2. Test both links on a real phone and confirm that each opens the intended business conversation.
3. Confirm business hours and service coverage before publishing them.
4. Add verified reviews and consented service photos when available.
5. Add service-specific landing pages when useful for local discovery.

Forms, calendars, customer accounts and automatic notifications are outside the current contact flow. Only add them if the owner requests them again.

## Technical standards

- Keep editable HTML, CSS, JavaScript and translations in src/. Public contact settings belong in src/scripts/site-config.js.
- Keep publishable static files in public/. Original images and retired concepts belong in design/ and must not be copied into dist/.
- Keep standards and setup notes in docs/, build utilities in scripts/, and automated checks in tests/. README.md documents the layout and preview commands.
- Store local screenshots and reference captures under .cache/screenshots/ and .cache/references/. These are not source or deployment files.
- Rebuild dist/ cleanly so removed assets and outdated script versions do not accumulate in the next artifact. Keep published URLs stable when reorganizing source files.

- Keep customer-facing copy and business claims easy to update.
- Deploy CSS and JavaScript using content-hashed filenames generated by scripts/build-site.mjs. Updated markup must not depend on a browser discarding an older stylesheet. Verify the built artifact as well as the local source page.
- Separate service data, city data, FAQ content, and contact configuration from presentation where practical.
- Treat messaging destinations, hours, service radius, and policy text as replaceable configuration.
- Do not store customer information in client-side logs or analytics events.
- Preserve clean future routes such as `/services`, `/service-area`, `/contact`, and `/faq`.
- Keep native contact links usable without JavaScript. Validate public destinations at build time.

## Messaging and privacy boundary

The website collects no contact information and has no submission endpoint, upload handler, calendar, email delivery or browser storage for leads. Customer conversations take place on WhatsApp or Facebook Messenger under the chosen platform's controls and policies. Do not embed chat SDKs or track message contents.

Direct links do not prevent platform spam. The owner manages incoming messages, blocking and reporting inside the business accounts. Do not claim that the website filters or rate-limits those conversations.

## Placeholder replacement checklist

Before launch or paid promotion, replace and verify:

- WhatsApp Business short link or number and Facebook Messenger URL
- Business hours
- Website URL and logo URL in structured data
- Actual service radius and city availability
- Emergency or urgent-service availability, if offered
- Warranty, parts, and workmanship policies, if offered
- Privacy Policy and Terms of Service
- Verified reviews and review dates
- Both chat destinations, tested against the intended business account

## Definition of done for messaging

- Both chat controls are visible in the hero and easy to tap on a phone.
- Empty configuration has an honest unavailable state; configured links work without JavaScript.
- English and Spanish copy, metadata and accessible labels stay consistent.
- The site does not collect customer details or imply delivery/booking on a link click.
- Appointment and pricing qualifications remain close to contact actions.
- Verify narrow phones, the iPhone 16 Pro viewport, desktop, keyboard navigation and reduced motion.
- Before marking a channel operational, verify its destination on a real device with the business owner.

## Current vehicle and service scope

The current public positioning is brake-first mobile service for cars, trucks, and vans, with vehicle compatibility confirmed individually upon contact. Supporting maintenance may include oil changes, oil filters, cabin air filters, and battery replacement when the vehicle, parts, location, and service conditions allow it.

Do not publish domestic-only restrictions or exclude vehicles by country of manufacture. Invite every potential customer to share the year, make, model and service needed; the owner decides whether the job can be supported during the conversation. Do not promise service for every make or model. Apply this consistently to both languages, search/social metadata and structured data. Keep additional maintenance visually secondary to brake and rotor work.

## Messaging follow-up

Customers start a conversation through a configured WhatsApp or Messenger link. The owner reviews their vehicle, city, concern and preferred day, then confirms details personally in that conversation. No automatic booking, email intake, newsletter subscription or SMS follow-up is implied.

Activate each channel independently when its business destination is supplied. WhatsApp is connected to the owner's business short link; Messenger remains labeled as coming soon until its destination is provided. See REQUEST_SETUP.md. Public configuration contains no account credentials.

Use “Free estimates” and “Fair pricing” instead of numerical ballparks or competitor comparisons. Tailor estimates to the customer’s vehicle, parts and service needs. Free estimates do not imply free inspections or repairs; discuss any inspection, service, tax or travel charges before work begins. Apply this messaging consistently in English and Spanish, including metadata. See DESIGN_NOTES.md.

## Confirmed local positioning

Based in Riverside, serving communities throughout the Inland Empire only. Emphasize direct owner contact and service tailored to each customer, with vehicle compatibility, location and availability confirmed personally. Do not imply a customer-facing storefront or guaranteed availability in every city.
