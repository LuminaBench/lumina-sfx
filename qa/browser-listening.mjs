// Optional browser rehearsal. Supply an installed Playwright module and Chrome executable.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, basename } from 'node:path';
import ts from 'typescript';
const { chromium } = await import(process.env.LUMINA_PLAYWRIGHT ?? 'playwright');
const root = new URL('../engine/', import.meta.url);
const prepared = process.argv[2];
const meter = `class SceneMeter extends AudioWorkletProcessor {
  constructor(){super();this.first=null;this.last=null;this.gaps=0;this.zeroFrames=0;this.sum=0;this.peak=0;}
  process(inputs,outputs){
    const c=inputs[0]?.[0]; if(c){let energy=0;
      for(let i=0;i<c.length;i++) {energy+=c[i]*c[i];this.peak=Math.max(this.peak,Math.abs(c[i]));}
      if(energy>1e-10){if(this.first===null)this.first=currentFrame;this.last=currentFrame;this.gaps+=this.zeroFrames;this.zeroFrames=0;}
      else if(this.first!==null)this.zeroFrames+=c.length;
      this.sum+=energy;
    }
    if(currentFrame%2048===0)this.port.postMessage({first:this.first,last:this.last,peak:this.peak,gapFrames:this.gaps,energy:this.sum});
    return true;
  }
};registerProcessor('scene-meter',SceneMeter);`;
const server = createServer(async (req, res) => {
  try {
    const path = new URL(req.url, 'http://localhost').pathname;
    if (path === '/') {
      res.setHeader('Content-Type', 'text/html');
      res.end('<!doctype html><title>Lumina browser QA</title>');
      return;
    }
    if (path === '/meter.js') {
      res.setHeader('Content-Type', 'text/javascript');
      res.end(meter);
      return;
    }
    if (['/live-listening.js', '/spatial.js'].includes(path)) {
      res.setHeader('Content-Type', 'text/javascript');
      const code = await readFile(new URL(path.slice(1).replace('.js', '.ts'), root), 'utf8');
      res.end(
        ts
          .transpileModule(code, {
            compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
          })
          .outputText.replaceAll("'./spatial.ts'", "'./spatial.js'"),
      );
      return;
    }
    if (prepared && path.startsWith('/pack/')) {
      const file = basename(path);
      res.end(await readFile(join(prepared, file)));
      return;
    }
    res.statusCode = 404;
    res.end();
  } catch (e) {
    res.statusCode = 500;
    res.end(e.message);
  }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
let browser;
try {
  browser = await chromium.launch({
    executablePath: process.env.LUMINA_CHROME ?? undefined,
    headless: true,
    args: ['--autoplay-policy=no-user-gesture-required', '--disable-background-timer-throttling'],
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('http://127.0.0.1:' + server.address().port);
  const results = await page.evaluate(async (prepared) => {
    const { ListeningPlayer, prepareHeadphones } = await import('/live-listening.js');
    const result = [];
    const ctx = new AudioContext({ sampleRate: 44100, latencyHint: 'interactive' });
    const start = performance.now();
    await ctx.resume();
    await ctx.audioWorklet.addModule('/meter.js');
    const unlockMs = performance.now() - start;
    let time = 1.15;
    for (const mode of ['headlocked', 'stereo', 'headphones'])
      for (const count of [1, 8, 32]) {
        const meter = new AudioWorkletNode(ctx, 'scene-meter');
        meter.connect(ctx.destination);
        let stats;
        meter.port.onmessage = (e) => (stats = e.data);
        const r = ctx.sampleRate,
          b = ctx.createBuffer(1, Math.round(r * time), r);
        const pcm = b.getChannelData(0);
        for (let i = 0; i < pcm.length; i++) pcm[i] = 0.12 * Math.sin((i * 2 * Math.PI * 810) / r);
        const sources = Array.from({ length: count }, (_, i) => ({
          label: 's' + i,
          offsetSec: 0,
          dry: { file: 'fixture.wav', restoreGain: 1 / count },
          placement:
            mode === 'headlocked'
              ? { kind: 'listener' }
              : { kind: 'point', position: [-1, 0, -2], path: [{ at: time, position: [1, 0, -2] }] },
        }));
        const gains = Object.fromEntries(sources.map((s) => [s.label, 1]));
        const manifest = {
          schemaVersion: 2,
          rate: r,
          frames: pcm.length,
          listener: { position: [0, 0, 0] },
          output: mode === 'headphones' ? mode : 'stereo',
          sources,
          regions: [{ from: 0, to: time, gain: gains }],
        };
        const player = new ListeningPlayer(ctx, manifest, new Map(sources.map((s) => [s.label, b])), meter);
        const warmStart = performance.now();
        if (mode === 'headphones') await prepareHeadphones(r);
        const warmupMs = performance.now() - warmStart;
        const before = performance.now(),
          when = ctx.currentTime + 0.035;
        player.play(when);
        const setupMs = performance.now() - before;
        const frames = [];
        let prev = performance.now(),
          raf;
        const tick = (t) => {
          frames.push(t - prev);
          prev = t;
          raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        await new Promise((resolve) => setTimeout(resolve, (time + 0.2) * 1000));
        cancelAnimationFrame(raf);
        player.stop();
        meter.disconnect();
        meter.port.close();
        frames.sort((a, b) => a - b);
        result.push({
          mode,
          count,
          warmupMs,
          setupMs,
          latencyAfterScheduledMs: stats?.first == null ? null : 1000 * (stats.first / r - when),
          firstFromPlayMs: stats?.first == null ? null : 1000 * (stats.first / r - when) + 35,
          gapFrames: stats?.gapFrames,
          peak: stats?.peak,
          frameP95ms: frames[Math.floor(frames.length * 0.95)],
          heapMB: performance.memory?.usedJSHeapSize / 1048576,
        });
      }
    const pack = [];
    if (prepared)
      for (let i = 0; i < 2; i++) {
        const offline = new OfflineAudioContext(2, 44100 * 7, 44100),
          a = performance.now();
        const player = await ListeningPlayer.preload(offline, new URL('/pack/scene.json', location.href));
        const preloadMs = performance.now() - a;
        player.play(0);
        const renderStart = performance.now(),
          buffer = await offline.startRendering();
        const energy = (ch, lo, hi) => {
          let s = 0;
          for (let i = Math.round(lo * 44100); i < hi * 44100; i++) s += buffer.getChannelData(ch)[i] ** 2;
          return s;
        };
        pack.push({
          preloadMs,
          renderMs: performance.now() - renderStart,
          frames: buffer.length,
          leftStart: energy(0, 0.15, 0.5),
          rightStart: energy(1, 0.15, 0.5),
          leftAcross: energy(0, 2.3, 2.6),
          rightAcross: energy(1, 2.3, 2.6),
        });
      }
    await ctx.close();
    return { unlockMs, rate: ctx.sampleRate, result, pack };
  }, Boolean(prepared));
  const pass =
    !errors.length &&
    results.result.every((t) => t.peak > 0 && t.gapFrames === 0) &&
    results.pack.every((t) => t.leftStart > t.rightStart && t.rightAcross > t.leftAcross);
  console.log(JSON.stringify({ pass, errors, ...results }, null, 2));
  process.exitCode = Number(!pass);
} finally {
  await browser?.close();
  server.close();
}
