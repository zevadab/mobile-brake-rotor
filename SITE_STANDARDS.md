# The Mobile Brake & Rotor Guy — Site Standards

## Purpose

This site is a trusted, fast touch point for customers in California’s Inland Empire who need brake or rotor service. Its primary job is to help a visitor quickly understand whether we can help, feel confident contacting us, and submit a complete request for an available appointment.

The site should always feel:

- Local, approachable, and professional
- Clear about what is known versus what still needs confirmation
- Focused on safety without creating unnecessary alarm
- Fast to use on a phone, especially when a customer is roadside or between work appointments

## Mobile-first and local discovery standard

Assume most first visits come from a phone after a local Google search such as “brake service near me,” “mobile brake repair,” or “rotor replacement Inland Empire.” Mobile conversion and local trust take priority over decorative desktop treatments.

- Keep the primary phone, text, and quote actions visible without requiring desktop navigation.
- Keep important copy, service area, and request controls near the top of the mobile experience.
- Use comfortable tap targets, readable text, short form steps, and minimal typing wherever possible.
- Test the page at narrow phone widths before considering a feature complete.
- Keep page title, description, headings, service names, cities served, and structured data aligned with real services and confirmed coverage.
- Make the business name, service type, Inland Empire coverage, and contact action easy for both people and search engines to understand.
- Avoid keyword stuffing, city-list spam, hidden text, or claims that are not operationally true.
- Optimize images and scripts so a customer on a mobile network can reach the quote action quickly.
- Preserve a clear path from a Google Business Profile visit to call, text, directions or service request.

## Primary customer path

Every page and feature should support this path:

1. **Recognize the need** — The customer sees a brake symptom or knows maintenance is due.
2. **Confirm fit** — They understand that we provide mobile brake and rotor service in their area.
3. **Request contact** — They submit vehicle, symptom, location, and timing details.
4. **Confirm availability** — The business reviews the request and confirms whether the location, service, and requested time can be supported.
5. **Prepare for service** — The customer receives clear next steps, expectations, and safety guidance.
6. **Complete the visit** — The technician performs the agreed inspection or service and communicates any change in scope before additional work.

The site must distinguish a **request** from a **confirmed appointment**. A form submission never guarantees availability, price, diagnosis, or completion of service.

## Customer request requirements

The quote/request experience should collect enough information for a useful first response without becoming burdensome on mobile.

### Required request fields

- Full name
- Phone number
- Email address
- City and service location
- Vehicle year, make, and model
- Service needed or “not sure” selection
- Description of brake concern
- Preferred appointment date and time
- Consent acknowledging that the submission is a request for contact, not an appointment guarantee

### Optional request fields

- Photos or short videos of visible brake issues
- License plate or VIN, only when operationally necessary
- Preferred contact method
- Additional location notes, such as parking, gate, or access instructions

### Request states

Future request handling should support these states:

- **Draft** — Form is being completed locally and has not been submitted.
- **Received** — Request reached the business system.
- **Needs information** — More vehicle, symptom, or location detail is needed.
- **Availability pending** — The request is being reviewed for schedule and service fit.
- **Proposed** — A time window and expected service path were offered.
- **Confirmed** — The customer accepted the appointment details.
- **Completed** — Service visit is finished.
- **Cancelled** — Request or appointment was cancelled.
- **Unable to service** — Location, vehicle, safety, or scope is outside current capability.

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

Use this or a reviewed equivalent near the quote form:

> Submitting this form requests contact. It does not guarantee an appointment, availability, price, diagnosis, parts selection, or completion of service. Final recommendations and pricing are confirmed after reviewing the vehicle, requested work, location, and service conditions.

## Content standards

- Keep headings direct and useful to a customer scanning on a phone.
- Lead with the service benefit: mobile brake help at the customer’s location.
- Prefer “we’ll confirm” over unsupported certainty.
- Clearly label sample reviews, placeholder business data, and development-only content.
- Never publish fictional testimonials as real customer reviews.
- Do not imply that every listed city is always available; invite customers to confirm coverage.
- Avoid fear-based copy, racing imagery, excessive technical jargon, and aggressive sales language.
- Keep phone, text, and quote actions visible and easy to tap on mobile.

## Design and accessibility standards

- Maintain the navy, orange, charcoal, white, and light-gray brand system.
- Use strong contrast and visible focus states.
- Use semantic headings in logical order.
- Every form control needs a visible label and a useful validation message.
- Touch targets should be comfortably tappable on small screens.
- Do not rely on color alone to communicate errors, success, or required actions.
- Keep motion subtle and respect `prefers-reduced-motion` when animations are added.
- Optimize for fast first load and avoid stock-photo-heavy pages.

## Feature roadmap

### Next customer-facing features

1. Connect quote submissions to a secure email, CRM, or backend endpoint.
2. Add request confirmation messaging and an internal request ID.
3. Add availability review tools for the business before showing appointment times.
4. Add SMS/email follow-up notifications after a request is received.
5. Add service-specific landing pages for brake pads, rotors, inspections, and diagnosis.
6. Replace sample reviews with verified customer feedback and consented vehicle details.
7. Add service-area pages after the actual radius and availability rules are confirmed.
8. Add analytics for quote starts, completed requests, call taps, text taps, and conversion by device.

### Future operational features

- Customer accounts and request history
- Calendar integration and appointment confirmation
- Secure photo uploads
- Pricing packages with clear scope and exclusions
- Payment or deposit support, if the business chooses to offer it
- Before-and-after service photos with customer permission
- Google Business Profile and review-request integration

## Technical standards

- Keep customer-facing copy and business claims easy to update.
- Separate service data, city data, FAQ content, and form configuration from presentation where practical.
- Treat phone numbers, email addresses, hours, service radius, and policy text as replaceable configuration.
- Validate and sanitize all submitted data once a backend is connected.
- Do not store customer information in client-side logs or analytics events.
- Use secure upload handling for photos and apply file type, size, and retention rules.
- Preserve clean future routes such as `/services`, `/service-area`, `/contact`, and `/faq`.
- Keep the current static prototype usable while backend integrations are developed.

## Form abuse and request-volume protection

The browser can improve the experience, but it cannot be the final security boundary. Once the form is connected to a real endpoint, apply protection on the server or form provider as well:

- Rate-limit by IP, email, and phone; start with a conservative limit such as a few requests per hour per signal.
- Add bot detection or a managed challenge only when spam volume justifies the added friction.
- Keep the honeypot field and reject submissions that fill it.
- Enforce the same field length, file type, and file size limits server-side.
- Accept only JPEG, PNG, or WebP photos and start with a 5 MB maximum.
- Validate and sanitize all text before storing, emailing, or displaying it.
- Do not send uploaded files directly to staff inboxes without scanning and controlled storage.
- Deduplicate repeated requests and alert staff to suspicious bursts rather than forwarding every message.
- Log request status and abuse signals without storing unnecessary personal data.
- Never rely on hidden fields, client-side cooldowns, or JavaScript validation alone.

## Placeholder replacement checklist

Before launch or paid promotion, replace and verify:

- Phone number and text number
- Email address
- Business hours
- Website URL and logo URL in structured data
- Actual service radius and city availability
- Emergency or urgent-service availability, if offered
- Warranty, parts, and workmanship policies, if offered
- Privacy Policy and Terms of Service
- Verified reviews and review dates
- Form submission endpoint and notification workflow

## Definition of done for a customer request feature

A request feature is ready when:

- A mobile visitor can complete it quickly and understand every required field.
- Validation explains how to fix incomplete or invalid information.
- The customer receives a clear success or failure state.
- The business receives the request with all submitted details and timestamp.
- The flow does not imply that an appointment is confirmed before review.
- Safety and service disclaimers appear at the point of decision.
- The feature works with keyboard navigation, screen readers, and reduced-motion settings.
- Test data, sample reviews, and placeholder business details cannot be mistaken for live production data.
