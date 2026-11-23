# Request email and personal text follow-up

## Current status

The form has a native date picker and time preference in Pacific Time, plus SMS/WhatsApp follow-up preference. It does not show live availability or reserve a calendar slot.

Requests remain in preview mode because the business number, Zoho inbox and email-delivery endpoint have not been supplied. Nothing is sent in preview mode; no customer data is saved in browser storage. A session timestamp supports the local cooldown.

## Public configuration

Edit site-config.js once details are verified:

- phone: business call/SMS number in international +countrycode format.
- whatsapp: verified WhatsApp number in international +countrycode format.
- email: verified business inbox, displayed in the footer.
- requestEndpoint: an HTTPS endpoint that accepts multipart FormData.

Setting email alone does not deliver forms. GitHub Pages is a static host; a backend or form provider must forward requests to the inbox. No SMTP credentials, passwords or private API keys belong in this file.

## Endpoint contract

Accept the named form fields: year, make, model, vehicleType, service, issue, name, phone, email, city, location, date, time, contactMethod, language, siteLanguage, photo, website, consent, and timeZone (America/Los_Angeles).

language is the customer's preferred follow-up language (en or es); siteLanguage identifies the page language (en or es). Validate both against that allowlist. Show the preferred language prominently in the business notification. Spanish labels preserve the same canonical service, vehicle, location and time values as the English form; customer-entered descriptions may be in either language.

Validate all fields and consent on the server. Apply request body limits, image validation/scanning, rate limiting and deduplication before email delivery. Allow only the production website origin for browser CORS. Never trust a browser-supplied recipient address; the business inbox is server configuration.

Return a successful HTTP response with JSON {"received":true} only after durable acceptance for delivery. Other responses, rate limits and timeouts leave the customer's form intact and show an error. The browser never automatically retries.

Email subject: New brake-service request — city / vehicle.
Email content: customer contact details, follow-up channel and language preference, vehicle, service, issue, location type, preferred Pacific date/time and safe attachment link. Set reply-to only after validation; do not interpolate user data into mail headers.

An appointment is confirmed by the owner after a personal conversation. If calendar integration is added, create only a tentative internal request event until the customer accepts the time; do not send a confirmed calendar invitation on submission.

## Activation checks

Provide the WhatsApp number and receiving inbox, then connect the chosen secure email adapter. Verify actual inbox receipt, spam controls, mobile requests, validation errors and the owner's text follow-up. Test preview and live states separately. A mocked endpoint test does not establish real email delivery.
