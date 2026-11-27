import test from 'node:test';
import assert from 'node:assert/strict';
import { encodeDelivery, oggFinalGranule } from '../scripts/audio-export.mjs';

function sineWav(frames, hz, rate = 44100) {
  const wav = Buffer.alloc(44 + frames * 2);
  wav.write('RIFF', 0); wav.writeUInt32LE(36 + frames * 2, 4); wav.write('WAVEfmt ', 8);
  wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(1, 22);
  wav.writeUInt32LE(rate, 24); wav.writeUInt32LE(rate * 2, 28); wav.writeUInt16LE(2, 32); wav.writeUInt16LE(16, 34);
  wav.write('data', 36); wav.writeUInt32LE(frames * 2, 40);
  for (let i = 0; i < frames; i++) wav.writeInt16LE(Math.round(16000 * Math.sin(2 * Math.PI * hz * i / rate)), 44 + i * 2);
  return wav;
}

// With FFmpeg n9.0.2, the 8820-frame 440 Hz and 10000-frame 660 Hz cues decode about
// 1,000 frames long because the decoder skips their end trim; the others decode 128 short.
for (const [frames, hz] of [[4410, 440], [8820, 440], [10000, 660], [22050, 440], [66150, 440]]) {
  test(`Ogg delivery declares the master length for ${frames} frames at ${hz} Hz`, async () => {
    const ogg = await encodeDelivery(sineWav(frames, hz), 'ogg');
    assert.equal(ogg.subarray(0, 4).toString(), 'OggS');
    assert.ok(Math.abs(oggFinalGranule(ogg) - frames) <= 2);
  });
}

test('Opus delivery still passes for a short cue', async () => {
  const opus = await encodeDelivery(sineWav(8820, 440), 'opus');
  assert.equal(opus.subarray(0, 4).toString(), 'OggS');
});
