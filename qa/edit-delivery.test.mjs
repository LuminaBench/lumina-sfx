import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { ffmpegPath } from '../scripts/audio-export.mjs';
import { auditDelivery } from '../scripts/edit-delivery.mjs';
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
