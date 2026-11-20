// Duman testi: sayfa açılıyor mu, konsol hatası var mı, oyun başlıyor mu, bir etkileşim durumu değiştiriyor mu,
// telefon görünümünde taşma var mı. Hiçbir bağımlılık depoya eklenmez.
//
// Kullanım:  node test/duman.mjs [klasör]        (klasör verilmezse deponun kökü)
// Gerekli:   `playwright-core` (depo dışında kurulu olabilir: PW_MODULE=<klasör>) ve bir Chromium tabanlı tarayıcı:
//            CHROMIUM=<tarayıcı exe yolu> (verilmezse Playwright'ın kendi tarayıcısı).
// Not:       yazılım WebGL (swiftshader) gölge shader'ında bağlam kaybı bildirir ve sayfa donar (ana sürümde de);
//            bu yüzden test '?low' (gölgesiz) ile çalışır; 'WebGL:' / 'GL Driver' uyarıları sayılmaz, sayfa/ağ/konsol hataları sayılır.
// Çıktı: "ok" / "FAIL" satırları, en sonda RESULT; hata varsa çıkış kodu 1.
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname, normalize, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(process.argv[2] || join(here, '..'));
const req = createRequire(process.env.PW_MODULE ? pathToFileURL(join(process.env.PW_MODULE, 'x.js')) : import.meta.url);
const { chromium } = req('playwright-core');
const IGNORED = /gc\.zgo\.at|goatcounter/;
const SOFT = /WebGL:|GL Driver|THREE\.WebGLProgram|Shader Error/;
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.mp3': 'audio/mpeg', '.glb': 'model/gltf-binary', '.woff2': 'font/woff2', '.webp': 'image/webp', '.hdr': 'application/octet-stream' };
let failed = false;
const ok = (m) => console.log('ok   ' + m);
const fail = (m) => { failed = true; console.log('FAIL ' + m); };
const check = (c, m) => (c ? ok(m) : fail(m));

const srv = createServer((rq, rs) => {
  let p = normalize(decodeURIComponent(new URL(rq.url, 'http://x').pathname)).replace(/^([/\\])+/, '');
  let f = join(root, p || 'index.html');
  if (!f.startsWith(root)) { rs.writeHead(403).end(); return; }
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  if (!existsSync(f)) { rs.writeHead(404, { 'content-type': 'text/plain' }).end('404'); return; }
  rs.writeHead(200, { 'content-type': MIME[extname(f)] || 'application/octet-stream' }).end(readFileSync(f));
});
await new Promise((r) => srv.listen(0, '127.0.0.1', r));
const base = 'http://127.0.0.1:' + srv.address().port + '/';
console.log('hedef: ' + root);

const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM || undefined, args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
try {
  for (const [name, vp, mobile] of [['masaustu 1366x768', { width: 1366, height: 768 }, false], ['telefon 390x844', { width: 390, height: 844 }, true]]) {
    const ctx = await browser.newContext({ viewport: vp, isMobile: mobile, hasTouch: mobile });
    await ctx.route(IGNORED, (r) => r.fulfill({ status: 200, body: '' }));
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', (e) => errs.push('pageerror: ' + e.message));
    page.on('console', (m) => { if (m.type() === 'error' && !SOFT.test(m.text())) errs.push('console: ' + m.text().slice(0, 160)); });
    page.on('requestfailed', (r) => { if (!IGNORED.test(r.url())) errs.push('requestfailed: ' + r.url()); });
    page.on('response', (r) => { if (r.status() >= 400 && !IGNORED.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.goto(base + '?low', { waitUntil: 'load' });
    await page.waitForFunction(() => { const b = document.getElementById('tPlay'); return b && !b.disabled; }, null, { timeout: 90000 });
    check(true, `[${name}] sayfa açıldı, "Yeni oyun" düğmesi etkin`);
    const title = await page.title();
    check(/Kervan/.test(title), `[${name}] başlık: ${title}`);
    const over = await page.evaluate(() => {
      const w = innerWidth, bad = [];
      for (const e of document.querySelectorAll('#title button, #title a')) { const r = e.getBoundingClientRect(); if (r.width && (r.left < -1 || r.right > w + 1 || r.bottom > innerHeight + 1)) bad.push(e.id || e.textContent); }
      return { h: document.documentElement.scrollWidth > w + 1, bad };
    });
    check(!over.h && !over.bad.length, `[${name}] başlık ekranında taşma yok ${over.bad.join(',')}`);
    if (await page.$('#tNews')) {
      await page.click('#tNews');
      const shown = await page.evaluate(() => !document.getElementById('modal').classList.contains('hidden') && document.querySelectorAll('#modal .newslist li').length >= 3);
      check(shown, `[${name}] Yenilikler penceresi açılıyor ve maddeleri var`);
      const ov2 = await page.evaluate(() => { const r = document.querySelector('#modal .box').getBoundingClientRect(); return r.left >= -1 && r.right <= innerWidth + 1; });
      check(ov2, `[${name}] Yenilikler kartı ekrana sığıyor`);
      await page.keyboard.press('Escape');
      check(await page.evaluate(() => document.getElementById('modal').classList.contains('hidden')), `[${name}] Esc ile kapanıyor`);
    } else console.log(`n/a  [${name}] Yenilikler penceresi bu sürümde yok`);
    await page.click('#tPlay');
    await page.waitForFunction(() => window.kervan && window.kervan.game.started, null, { timeout: 30000 });
    const s0 = await page.evaluate(() => ({ day: window.kervan.state.day, st: window.kervan.state.status, akce: window.kervan.state.akce }));
    check(s0.st === 'playing', `[${name}] oyun başladı (gün ${s0.day}, ${s0.akce} akçe)`);
    await page.keyboard.press('KeyP');
    check(await page.evaluate(() => window.kervan.game.modalKind === 'pause'), `[${name}] P ile duraklatma çalışıyor`);
    await page.keyboard.press('KeyP');
    await page.keyboard.press('Digit3');
    await page.waitForTimeout(1500);
    const s1 = await page.evaluate(() => ({ day: window.kervan.state.day, t: window.kervan.state.time ?? window.kervan.state.day }));
    await page.evaluate(() => window.__game.step(30));
    const s2 = await page.evaluate(() => window.kervan.state.day);
    check(s2 > s0.day, `[${name}] 30 sn ileri sarınca gün ilerledi: ${s0.day} -> ${s2}`);
    await page.waitForTimeout(500);
    check(errs.length === 0, `[${name}] konsol/sayfa/ağ hatası yok` + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
    await ctx.close();
  }
  // eski kayıt: yeni anahtar yokken ve eski best ile açılış
  {
    const ctx = await browser.newContext({ viewport: { width: 1366, height: 768 } });
    await ctx.route(IGNORED, (r) => r.fulfill({ status: 200, body: '' }));
    await ctx.addInitScript(() => { try { if (!localStorage.getItem('arena.kervan.best')) localStorage.setItem('arena.kervan.best', JSON.stringify({ score: 4321, stars: 2, day: 190 })); } catch (e) {} });
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', (e) => errs.push(e.message));
    await page.goto(base + '?low', { waitUntil: 'load' });
    await page.waitForFunction(() => { const b = document.getElementById('tPlay'); return b && !b.disabled; }, null, { timeout: 90000 });
    check(await page.evaluate(() => /4\.321|4,321/.test(document.getElementById('tBest').textContent)), 'eski "best" kaydı başlıkta okunuyor');
    check(errs.length === 0, 'eski kayıtla açılışta sayfa hatası yok');
    await ctx.close();
  }
  // bot: ?auto, simülasyon ilerliyor, oyun içi hata yok
  {
    const ctx = await browser.newContext({ viewport: { width: 1366, height: 768 } });
    await ctx.route(IGNORED, (r) => r.fulfill({ status: 200, body: '' }));
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', (e) => errs.push(e.message));
    await page.goto(base + '?auto&noassets&debug', { waitUntil: 'load' });
    await page.waitForFunction(() => window.kervan && window.kervan.game.started && typeof window.kervanSim === 'function', null, { timeout: 90000 });
    const r = await page.evaluate(() => { const K = window.kervan; const d0 = K.state.day; for (let i = 0; i < 40 && K.state.status === 'playing'; i++) window.kervanSim(120); return { d0, day: K.state.day, st: K.state.status, errors: K.info().errors.length }; });
    check(r.day > r.d0, `bot ilerledi: gün ${r.d0} -> ${r.day}, durum ${r.st}`);
    check(r.errors === 0 && errs.length === 0, 'bot oturumunda oyun içi hata yok');
    await ctx.close();
  }
  // 404 sayfası
  {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    check(existsSync(join(root, '404.html')), '404.html var');
    await page.goto(base + '404.html');
    check(/bulunamadı/.test(await page.title()), '404 sayfası Türkçe başlıklı');
    await ctx.close();
  }
} catch (e) { fail('beklenmeyen: ' + (e && e.message)); }
await browser.close();
srv.close();
console.log(failed ? 'RESULT FAIL' : 'RESULT OK');
process.exit(failed ? 1 : 0);
