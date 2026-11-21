import { createServer } from 'node:http';
import { createRequire, stripTypeScriptTypes } from 'node:module';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { ROOT } from '../scripts/recipes.mjs';

const { values } = parseArgs({ options: {
  'studio-3d': { type: 'string' }, bank: { type: 'string' }, browser: { type: 'string' }, help: { type: 'boolean' },
} });
if (values.help) {
  console.log('Build the bank first with scripts/build-3d-bank.mjs. Run node --experimental-strip-types qa/3d-bridge.mjs [--studio-3d <checkout>] [--bank <directory>] [--browser <Chromium executable>].');
  process.exit(0);
}
const studio = resolve(values['studio-3d'] || join(dirname(ROOT), 'lumina-3d-studio'));
const bank = resolve(values.bank || join(ROOT, 'qa/output', 'master-wav', 'lumina-3d-bank'));
const source = stripTypeScriptTypes(await readFile(join(studio, 'engine/sfx-bridge.ts'), 'utf8'));
const { chromium } = createRequire(join(studio, 'package.json'))('playwright');
const manifest = JSON.parse(await readFile(join(bank, 'manifest.json'), 'utf8'));
const { items } = JSON.parse(await readFile(join(studio, 'catalog.json'), 'utf8'));
const vehicles = items.filter(item => item.type === 'asset' && item.mode);
for (const asset of vehicles) {
  if (manifest.profiles?.[manifest.assets?.[asset.id]]?.mode !== asset.mode) {
    throw Error('Full bank does not cover current 3D vehicle ' + asset.id);
  }
}
const files = new Set(Object.values(manifest.cues).map(entry => entry.url));
const legacy = Object.fromEntries(['car','jet','boat','rain','skid','explosion'].map(role => [role, manifest.cues[role]]));
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname === '/') return res.setHeader('Content-Type', 'text/html').end('<!doctype html><title>Bridge QA</title>');
    if (url.pathname === '/bridge.js') return res.setHeader('Content-Type', 'text/javascript').end(source);
    if (url.pathname === '/bank/manifest.json') return res.setHeader('Content-Type', 'application/json').end(JSON.stringify(manifest));
    if (url.pathname === '/legacy/manifest.json') return res.setHeader('Content-Type', 'application/json').end(JSON.stringify({ version: 1, cues: legacy }));
    const file = basename(url.pathname);
    if (!files.has(file)) return res.writeHead(404).end();
    res.setHeader('Content-Type', 'audio/wav').end(await readFile(join(bank, file)));
  } catch { res.writeHead(500).end(); }
});
await new Promise((ok, fail) => server.once('error', fail).listen(0, '127.0.0.1', ok));
let browser;
try {
  const macChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const executablePath = values.browser || (existsSync(chromium.executablePath()) ? undefined : existsSync(macChrome) ? macChrome : undefined);
  browser = await chromium.launch({ executablePath, args: ['--autoplay-policy=no-user-gesture-required'] });
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:' + server.address().port);
  const result = await page.evaluate(async ({ manifest, legacy }) => {
    // Track the decoded assets at the Web Audio API boundary without inspecting
    // any private bridge state. Every start below is a real browser audio voice.
    const fileIds = new Map(Object.values(manifest.cues).map(cue => [cue.url, cue.id]));
    const bytes = new WeakMap(), buffers = new WeakMap(), loops = new Map(), events = [];
    const body = Response.prototype.arrayBuffer;
    Response.prototype.arrayBuffer = async function () {
      const result = await body.call(this);
      bytes.set(result, fileIds.get(new URL(this.url).pathname.split('/').pop()));
      return result;
    };
    const decode = BaseAudioContext.prototype.decodeAudioData;
    BaseAudioContext.prototype.decodeAudioData = async function (data) {
      const id = bytes.get(data), buffer = await decode.call(this, data);
      buffers.set(buffer, id);
      return buffer;
    };
    const start = AudioBufferSourceNode.prototype.start, stop = AudioBufferSourceNode.prototype.stop;
    AudioBufferSourceNode.prototype.start = function (...args) {
      const id = buffers.get(this.buffer);
      if (this.loop) loops.set(this, id);
      else events.push(id);
      return start.apply(this, args);
    };
    AudioBufferSourceNode.prototype.stop = function (...args) {
      loops.delete(this);
      return stop.apply(this, args);
    };
    const assert = (condition, message) => { if (!condition) throw Error(message); };
    const { SfxBridge } = await import('/bridge.js');
    const bridge = new SfxBridge('/bank/manifest.json');
    await bridge.unlock();
    assert(bridge.available, 'Bank did not unlock');
    for (const [asset, key] of Object.entries(manifest.assets)) {
      const profile = manifest.profiles[key];
      await bridge.prepare(profile.mode, { asset });
      bridge.update(profile.mode, { rpm: 4000, slip: 0 }, { asset });
      const ids = new Set(loops.values());
      assert(ids.size === 2 && ids.has(profile.idle) && ids.has(profile.power), 'Engine layer mismatch for ' + asset);
    }
    for (const [preset, id] of Object.entries(manifest.weather)) {
      await bridge.prepare('car', { preset });
      bridge.update('car', { rpm: 2800, slip: 0 }, { preset, rain: .8 });
      assert([...loops.values()].includes(id), 'Missing weather voice for ' + preset);
    }
    await bridge.prepare('boat');
    bridge.explosion(); bridge.explosion(.7, 'water'); bridge.thunder();
    for (const key of ['explosion','waterExplosion','thunder']) assert(events.includes(manifest.cues[key].id), 'Missing event ' + key);
    bridge.stopMotion();
    assert(!loops.size, 'stopMotion left a voice active');
    bridge.dispose();
    const old = new SfxBridge('/legacy/manifest.json');
    await old.unlock(); old.update('jet', { rpm: 3100, slip: 0 }, { rain: .5 });
    const legacyRoles = [...loops.values()];
    assert(legacyRoles.includes(legacy.jet.id) && legacyRoles.includes(legacy.rain.id), 'Legacy scheme mismatch');
    old.dispose();
    return { vehicleProfiles: Object.keys(manifest.assets).length, weatherPresets: Object.keys(manifest.weather).length, eventVoices: events, legacyRoles };
  }, { manifest, legacy });
  console.log(JSON.stringify({ pass: true, current3dVehicles: vehicles.length, ...result }, null, 2));
} finally {
  await browser?.close();
  server.close();
}
