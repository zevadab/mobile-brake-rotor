// Optional full browser audit. See README.md for local tooling and preview setup.
const assert = require('node:assert/strict');
const { writeFile, mkdir } = require('node:fs/promises');
let playwright;
try { playwright = require('playwright'); }
catch { playwright = require('../.cache/audit-tools/node_modules/playwright'); }
const axePath = require.resolve('../.cache/audit-tools/node_modules/axe-core/axe.min.js');
const base = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4173';
const destination = 'https://wa.me/message/TLXNPSOKQA2ZN1';
const viewports = [
 {width:320,height:740}, {width:402,height:874}, {width:701,height:900},
 {width:768,height:1024}, {width:874,height:402}, {width:1024,height:900},
 {width:1100,height:900}, {width:1440,height:1000}
];

async function inspectLayout(page) {
 return page.evaluate(() => ({
  width:innerWidth, scroll:document.documentElement.scrollWidth,
  clipped:[...document.querySelectorAll('h1,h2,h3,.message-button,.header-inner')].filter(e=>
   e.getBoundingClientRect().width && e.scrollWidth > e.clientWidth + 1
  ).map(e=>e.tagName+'.'+e.className),
  brokenImages:[...document.images].filter(e=>!e.complete || !e.naturalWidth).map(e=>e.src),
  missingAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>
   !document.querySelector(a.getAttribute('href'))
  ).map(a=>a.getAttribute('href'))
 }));
}
function assertLayout(layout) {
 assert.ok(layout.scroll<=layout.width, 'Horizontal overflow: '+JSON.stringify(layout));
 assert.deepEqual(layout.clipped, [], 'Clipped text/controls');
 assert.deepEqual(layout.brokenImages, [], 'Broken images');
 assert.deepEqual(layout.missingAnchors, [], 'Broken internal links');
}
(async () => {
 const results=[];
 await mkdir('.cache/screenshots', {recursive:true});
 for (const engine of [playwright.chromium, playwright.webkit]) {
  const browser=await engine.launch({headless:true});
  try {
   for (const viewport of viewports) {
    const context=await browser.newContext({viewport,reducedMotion:'reduce'});
    // Verify native navigation without contacting or messaging a business.
    await context.route('https://wa.me/**', r=>r.fulfill({contentType:'text/plain',body:'Local audit interception.'}));
    const page=await context.newPage();
    const errors=[];
    page.on('pageerror', error=>errors.push(error.message));
    page.on('response', response=>{
     if(response.url().startsWith(base) && response.status()>=400)errors.push(response.status()+' '+response.url());
    });
    for (const locale of ['index.html','es.html']) {
     await page.goto(base+'/'+locale, {waitUntil:'networkidle'});
     assert.equal(await page.locator('h1').count(),1);
     assert.equal(await page.locator('form,input,select,textarea,dialog').count(),0);
     assert.equal(await page.locator('[data-message-channel="messenger"][disabled]').count(),3);
     const whatsapps=page.locator('a[data-message-channel="whatsapp"]');
     assert.equal(await whatsapps.count(),3);
     for(const link of await whatsapps.all())assert.equal(await link.getAttribute('href'),destination);
     const main=await page.locator('main').innerText();
     assert.doesNotMatch(main, /\$\d|ballpark|domestic|marcas americanas/i);
     assert.ok(main.includes(locale==='es.html'?'Cotizaci\u00f3n gratis':'Free estimate'));

     for(const section of await page.locator('main>section,footer').all())await section.scrollIntoViewIfNeeded();
     const layout=await inspectLayout(page);
     assertLayout(layout);
     await page.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));
     assert.ok(await page.evaluate(()=>{
      const bar=document.querySelector('.mobile-bar').getBoundingClientRect();
      return !bar.height || document.querySelector('footer').getBoundingClientRect().bottom<=bar.top+2;
     }), 'Footer is hidden behind the mobile action bar');

     let accessibility=null;
     if([320,1440].includes(viewport.width)){
      await page.addScriptTag({path:axePath});
      const axe=await page.evaluate(()=>window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa','best-practice']}}));
      accessibility={version:await page.evaluate(()=>window.axe.version),violations:axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))};
      assert.deepEqual(accessibility.violations, [], 'Accessibility findings');
     }
     await page.evaluate(()=>scrollTo(0,0));
     if(viewport.width<=700){
      await page.locator('.menu-toggle').click();
      await page.locator('#main-nav a').first().focus();
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
      assert.ok(await page.locator('.menu-toggle').evaluate(e=>e===document.activeElement),'Escape must restore focus');
      await page.locator('.menu-toggle').click();
      await page.locator('#main-nav a').first().click();
      assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
     }
     for(const details of await page.locator('.faq details').all()){
      await details.locator('summary').focus();
      await page.keyboard.press('Enter');
      assert.notEqual(await details.getAttribute('open'),null);
     }
     if(viewport.width===402){
      for(const link of await whatsapps.all()){
       const popupPromise=page.waitForEvent('popup');
       await link.click();
       const popup=await popupPromise;
       await popup.waitForLoadState();
       assert.equal(popup.url(),destination);
       await popup.close();
      }
      await page.locator('.language-switch').click();
      assert.equal(await page.locator('html').getAttribute('lang'),locale==='es.html'?'en':'es');
     }
     assert.deepEqual(errors,[]);
     results.push({engine:engine.name(),locale,viewport,layout,accessibility});
    }
    await context.close();
   }
   // Native navigation and chat remain available when JS is off.
   for(const locale of ['index.html','es.html']){
    const context=await browser.newContext({viewport:{width:402,height:874},javaScriptEnabled:false});
    const page=await context.newPage();
    await page.goto(base+'/'+locale);
    assert.ok(await page.locator('#main-nav').isVisible());
    await page.locator('#main-nav a').first().click();
    assert.ok(page.url().endsWith('#services'));
    assert.equal(await page.locator('a[data-message-channel="whatsapp"]').count(),3);
    await context.close();
   }
   // Enlarged text must not disappear inside clipped hero or chat controls.
   for(const width of [320,402]){
    const context=await browser.newContext({viewport:{width,height:874},reducedMotion:'reduce'});
    const page=await context.newPage();
    await page.goto(base+'/es.html');
    await page.evaluate(()=>document.documentElement.style.fontSize='200%');
    for(const section of await page.locator('main>section,footer').all())await section.scrollIntoViewIfNeeded();
    assertLayout(await inspectLayout(page));
    await page.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));
    assert.ok(await page.evaluate(()=>document.querySelector('footer').getBoundingClientRect().bottom<=document.querySelector('.mobile-bar').getBoundingClientRect().top+2));
    await context.close();
   }
   // Default motion must reveal every section, and reduced motion must settle immediately.
   const context=await browser.newContext({viewport:{width:402,height:874}});
   const page=await context.newPage();
   await page.goto(base);
   for(const section of await page.locator('main>section,footer').all())await section.scrollIntoViewIfNeeded();
   await page.emulateMedia({reducedMotion:'reduce'});
   await page.waitForFunction(()=>!document.querySelector('.reveal-pending'));
   assert.equal(await page.locator('.owner-hero-photo img').evaluate(e=>getComputedStyle(e).animationName),'none');
   await context.close();
   console.log(engine.name()+': layout, links, keyboard, accessibility, 200% text, no-JS and reduced-motion checks passed.');
  } finally { await browser.close(); }
 }
 await writeFile('.cache/audit-results.json',JSON.stringify({checkedAt:new Date().toISOString(),results},null,2));
 console.log('Audit complete: '+results.length+' page/viewport combinations.');
})().catch(error=>{console.error(error);process.exitCode=1});

