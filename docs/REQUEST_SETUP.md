# Direct business messaging

The website uses WhatsApp and Facebook Messenger for customer contact. It has no contact form, calendar, booking popup, email delivery adapter or stored customer details.

## Activate the buttons

1. Finish setting up the business account for each channel you want to use.
2. Supply the WhatsApp Business short link in the form `https://wa.me/message/BusinessCode`, or an international number with a leading + and digits only. The owner supplied `https://wa.me/message/TLXNPSOKQA2ZN1`, which is now configured.
3. Get the business Page's Messenger URL, in the form https://m.me/PageUsernameOrId. Check that it opens the business conversation, not a personal profile.
4. Update the public fields in `src/scripts/site-config.js`: `whatsapp` and `messengerUrl`. Leave an unready channel blank. Never add a password, API key or access token.
5. Run `node scripts/build-site.mjs` and `node --test tests/build-site.test.mjs`. Preview `dist/` locally.
6. Check both English and Spanish. Configured buttons show “Open chat” / “Abrir chat”; blank channels show “Coming soon” / “Próximamente” and remain disabled. The two channels can launch independently.
7. Push to `main`. GitHub Actions builds and publishes through the existing Pages workflow.
8. On a real phone, open each link and verify the intended business account. Check the platform's browser/sign-in experience as well. Opening a link does not send a message.

The build validates destinations and renders native links in the hero, contact section and mobile action bar. They work without JavaScript and open in a new tab with `noopener noreferrer`. No chat SDK is loaded.

Service-card, free-estimate, header and closing actions marked `data-direct-contact` open the first configured chat (WhatsApp, then Messenger). With neither configured, they lead to the contact section. Explicit channel buttons continue to open their own platform.

## Google reviews and payment information

`googleReviewsUrl` points to the owner's supplied Google Business Profile share link: https://share.google/KW68Dg9SJO2Y3RwcV. The footer displays the owner's reported 5.0/5 rating as a dated snapshot from November 24, 2026. Google presented an automated-traffic check during verification, so the count and individual review text were not independently read and are not displayed. Do not invent review counts, names or quotations. Update the rating and its date in both languages when the owner provides new information; this is not a live review feed.

Google links are validated during the build. There is no review widget, API key, review scraping or aggregate-rating structured data. If the Google URL is cleared, its link is omitted.

The owner confirmed Visa, credit cards and Zelle on November 24, 2026. These appear as payment information in the footer, FAQ and business structured data. The website does not collect card details or initiate Zelle payments. Payment arrangements are discussed directly with the customer.

WhatsApp Business short links are preserved exactly. International numbers are converted to `https://wa.me/` followed by digits without the leading +, per [WhatsApp's click-to-chat guidance](https://faq.whatsapp.com/5913398998672934). The build accepts only HTTPS short links on `wa.me` with `/message/` and an alphanumeric business code, without query parameters or fragments. Messenger accepts only HTTPS links on `m.me` with a single Page username or ID; no redirect parameters or other domains.

## Customer expectations

Ask customers to share their vehicle's year, make, model, city, concern and preferred day in the chat. Reply personally and agree on scope, pricing and an available time. A message is not a confirmed appointment, and the website must not claim that a message was delivered just because a link was opened.

The business handles incoming message volume, blocking and reporting within WhatsApp or Messenger. The site does not collect, upload or retain customer details. Existing Zoho mail configuration is separate and is not used by this contact flow.
