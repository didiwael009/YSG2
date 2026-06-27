import { chromium } from 'playwright';
const url = 'https://www.lucidya.com/';
const out = 'public/cro-teardowns/lucidya/selected/current-live.png';
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox','--disable-dev-shm-usage'] });
const ctx = await browser.newContext({ viewport:{width:1440,height:900}, userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', ignoreHTTPSErrors:true });
const page = await ctx.newPage();
try {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(5000);
  const h1 = await page.evaluate(()=>document.querySelector('h1')?.innerText||'(no h1)');
  await page.screenshot({ path: out, fullPage: false });
  console.log('CAPTURED. H1:', JSON.stringify(h1.slice(0,90)));
} catch(e) { console.log('FAILED:', e.message.split('\n')[0]); }
finally { await browser.close(); }
