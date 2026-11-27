import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { ffmpegPath } from '../scripts/audio-export.mjs';
import { auditDelivery, probeStereo } from '../scripts/edit-delivery.mjs';
import { measureTrack } from '../scripts/edit-track.mjs';
import { scoreGain } from '../scripts/edit-context.mjs';
import { mixPicture } from '../scripts/edit-media.mjs';

test('decoded delivery audit finds a missing added stem, original clipping pressure and a mono cancellation', async (t) => {
  const ff = ffmpegPath(),
    available = spawnSync(ff, ['-version']);
  if (available.error?.code === 'ENOENT') return t.skip('FFmpeg required for picture delivery');
  const tmp = await mkdtemp(join(tmpdir(), 'lumina-delivery-'));
  const file = (name) => join(tmp, name);
  const encode = (...args) => {
    const r = spawnSync(ff, ['-v', 'error', '-nostdin', ...args], { encoding: 'utf8' });
    assert.equal(r.status, 0, r.stderr);
  };
  try {
    encode(
      '-f',
      'lavfi',
      '-i',
      'color=size=48x48:rate=24:duration=1',
      '-f',
      'lavfi',
      '-i',
      'aevalsrc=0.985*sin(2*PI*440*t)|-0.985*sin(2*PI*440*t):s=48000:d=1',
      '-c:v',
      'libx264',
      '-c:a',
      'alac',
      file('source.mp4'),
    );
    encode(
      '-f',
      'lavfi',
      '-i',
      'aevalsrc=0.14*sin(2*PI*710*t)*between(t\\,0.49\\,0.7)|0.14*sin(2*PI*710*t)*between(t\\,0.49\\,0.7):s=48000:d=1',
      '-c:a',
      'pcm_s16le',
      file('stem.wav'),
    );
    const delivery = await mixPicture(file('source.mp4'), file('stem.wav'), file('finished.mp4'));
    const plan = {
      id: 'probe',
      fps: 24,
      durationFrames: 24,
      cues: [{ id: 'sync', decision: 'play', syncFrame: 12 }],
    };
    const audit = (p) => auditDelivery(plan, file('source.mp4'), file('stem.wav'), file(p));
    const good = await audit('finished.mp4'),
      missing = await audit('source.mp4');
    assert.ok(delivery.truePeakDbtp <= -0.5 && delivery.deliveryTrimDb < 0);
    assert.ok(
      good.mixPeakDbfs < 0 && Math.abs(good.originalGainDb - delivery.deliveryTrimDb) < 0.5,
      JSON.stringify(good),
    );
    assert.ok(good.cues[0].addedGainDb === null || good.cues[0].addedGainDb < -1);
    assert.ok(good.cues[0].monoPhoneMixDbfs !== null && good.cues[0].monoPhoneMixDbfs < -25);
    assert.ok(missing.cues[0].warnings.length);
    assert.ok((missing.cues[0].monoPhoneMixDbfs ?? -Infinity) < -130);
  } finally {
    await rm(tmp, { recursive: true, force: true });
  }
});


test('the delivered stereo probe distinguishes left, silent, right and antiphase mono cancellation', async (t) => {
  const ff = ffmpegPath();
  if (spawnSync(ff, ['-version']).error?.code === 'ENOENT') return t.skip('FFmpeg required for stereo probes');
  const dir = await mkdtemp(join(tmpdir(), 'lumina-pan-'));
  try {
    const file = join(dir, 'orbit.wav');
    const l = '0.25*sin(2*PI*720*t)*(lt(t,0.2)+gte(t,0.7))';
    const r = '0.25*sin(2*PI*720*t)*(between(t,0.4,0.6)-gte(t,0.7))';
    const expression = "aevalsrc=exprs='" + l + "|" + r + "':s=48000:d=1";
    const made = spawnSync(ff, ['-v','error','-f','lavfi','-i',expression,'-c:a','pcm_s16le',file]);
    assert.equal(made.status, 0, made.stderr.toString());
    const { windows } = await probeStereo(file, [0.03,0.25,0.42,0.8], 70);
    assert.deepEqual(windows.map(w=>w.side), ['left','quiet','right','center']);
    assert.ok(windows[3].stereoRmsDbfs > -20 && (windows[3].monoRmsDbfs ?? -Infinity) < -90);
    await assert.rejects(probeStereo(file,[1.2]),/outside/);
  } finally { await rm(dir,{recursive:true,force:true}); }
});

test('a key under a bright speech segment leaves space without dimming adjacent equal-level keys', async (t) => {
  const ff = ffmpegPath();
  if (spawnSync(ff, ['-version']).error?.code === 'ENOENT') return t.skip('FFmpeg required');
  const dir = await mkdtemp(join(tmpdir(), 'lumina-speech-'));
  try {
    const file = join(dir, 'contrast.wav');
    const expr = '0.08*sin(2*PI*if(lt(t,0.5),200,3100)*t)';
    const made = spawnSync(ff, ['-v','error','-f','lavfi','-i', "aevalsrc=exprs='" + expr + "|-" + expr + "':s=48000:d=1",file]);
    assert.equal(made.status, 0, made.stderr.toString());
    const track = await measureTrack(file);
    const at = (f, speech) => scoreGain(-4, 'laptop-scissor-keyboard-key-down', f, 30, 'normal', speech, track);
    assert.ok(at(21,true) < at(6,true) - 3.5);
    assert.ok(Math.abs(at(21,false) - at(6,false)) < 0.1);
  } finally { await rm(dir, { recursive: true, force: true }); }
});
