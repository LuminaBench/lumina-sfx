import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { renderChannels } from '../engine/render.ts';
import { encodeWav } from '../engine/wav.ts';
import { composeListeningScene } from '../engine/listening-scene.ts';
import { placeAudio } from '../engine/spatial.ts';
const { masters } = JSON.parse(await readFile(new URL('./release-masters.json', import.meta.url)));
const { revisions } = JSON.parse(await readFile(new URL('./master-revisions.json', import.meta.url)));
for(const [id,r] of Object.entries(revisions)){
  if(r.previous!==masters[id] || r.current===r.previous || !/^[a-f0-9]{64}$/.test(r.current) || !r.reason)
    throw Error('Invalid master revision: '+id);
}
const mismatches = [];
for (const [id, expected] of Object.entries(masters)) {
  const { default: recipe } = await import('../recipes/' + id + '.ts');
  const raw = renderChannels(recipe);
  const point = { kind: 'point', position: [1, 0, -1] };
  composeListeningScene({ schemaVersion: 2, id: 'position-check' }, [{ recipe, placement: point }]);
  const positioned = placeAudio(
    raw.map((c) => c.subarray(0, 4096)),
    point,
    { position: [0, 0, 0] },
    'stereo',
    44100,
    0,
  );
  if (positioned.some((c) => !c.every(Number.isFinite))) throw Error('Positioning failed: ' + id);
  const bytes = encodeWav(raw);
  const actual = createHash('sha256').update(Buffer.from(bytes)).digest('hex');
  if (actual !== (revisions[id]?.current ?? expected)) mismatches.push(id);
}
console.log(JSON.stringify({ checked: Object.keys(masters).length, intentionalRevisions:Object.keys(revisions).length, mismatches }));
process.exitCode = Number(mismatches.length > 0);
