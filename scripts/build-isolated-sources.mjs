// Run with Node's TypeScript support. All inputs are checked-in CC0 takes.
// A stationary spectrum retains engine coloration while discarding the time sequence.
import { readFile, writeFile } from 'node:fs/promises';
import { stationaryTexture } from './recording-texture.mjs';
const folder = new URL('../recipes/_recordings/', import.meta.url);
function transient(take, sampleRate) {
  const pcm = Buffer.from(take, 'base64'),
    frames = pcm.length / 2;
  let peak = 0;
  for (let i = 0; i < frames; i++) peak = Math.max(peak, Math.abs(pcm.readInt16LE(i * 2)));
  let start = 0;
  while (start < frames && Math.abs(pcm.readInt16LE(start * 2)) < peak * 0.17) start++;
  start = Math.max(0, start - Math.round(0.0005 * sampleRate));
  const length = Math.min(frames - start, Math.round(0.034 * sampleRate));
  const result = Buffer.alloc(length * 2);
  for (let i = 0; i < length; i++)
    result.writeInt16LE(
      Math.round(
        pcm.readInt16LE((start + i) * 2) *
          Math.min(1, i / (sampleRate * 0.0003), (length - 1 - i) / (sampleRate * 0.004)),
      ),
      i * 2,
    );
  return result.toString('base64');
}
const inputs = JSON.parse(await readFile(new URL('../sources/isolated-inputs.json', import.meta.url), 'utf8'));
const check = process.argv.includes('--check');
for (const name of [...inputs.stationaryTexture, ...inputs.transient]) {
  const { default: clip } = await import(new URL(name + '.ts', folder));
  const transform = inputs.stationaryTexture.includes(name) ? stationaryTexture : transient;
  const takes = clip.takes.map((t) => transform(t, clip.sampleRate));
  const text =
    "// Derived offline by scripts/build-isolated-sources.mjs\nimport type { RecordedClip } from '../../engine/recording.ts';\nexport default " +
    JSON.stringify({ credit: clip.credit, sampleRate: clip.sampleRate, takes }, null, 2) +
    ' satisfies RecordedClip;\n';
  const file = new URL('isolated-' + name + '.ts', folder);
  if (check) {
    if ((await readFile(file, 'utf8')) !== text) throw Error('Isolation transform mismatch: ' + name);
  } else await writeFile(file, text);
}
