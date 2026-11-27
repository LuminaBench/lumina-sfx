import { mkdir, mkdtemp, rename, rm, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { renderEdit } from './edit-render.mjs';
import { reviseEdit } from './edit-score.mjs';
import { mixPicture, comparePictures } from './edit-media.mjs';

export async function auditionCue(plan, catalog, source, id, alternate, out, stream = 0) {
  const original=plan;
  const review=plan.cues.some(c=>c.id===id && c.sourceEvidence && c.decision!=='play');
  if(review)plan=reviseEdit(plan,[{id,sourceDecision:'add',lock:false}],catalog);
  const cue = plan.cues.find((c) => c.id === id);
  if (cue?.decision !== 'play') throw Error('Choose a playing cue to audition');
  const other = alternate ?? cue.alternatives?.[0];
  if (other && !cue.alternatives?.includes(other))
    throw Error('Choose a compatible alternative listed in the plan');
  const dest = resolve(out);
  await mkdir(dirname(dest), { recursive: true });
  if (
    await stat(dest).catch((e) => {
      if (e.code !== 'ENOENT') throw e;
    })
  )
    throw Error('Choose a new audition folder');
  const stage = await mkdtemp(join(dirname(dest), '.lumina-cue-'));
  try {
    const variants = [
      ['selected', plan],
      ['without', review ? original : reviseEdit(plan, [{ id, lock: false, mute: true }], catalog)],
    ];
    if (other) variants.push(['alternate', reviseEdit(plan, [{ id, lock: false, soundId: other }], catalog)]);
    for (const [label, score] of variants) {
      const stem = join(stage, 'stem.wav');
      await renderEdit(score, catalog, stem);
      await mixPicture(source, stem, join(stage, label + '.mp4'), stream);
      await rm(stem);
    }
    await comparePictures(
      join(stage, 'selected.mp4'),
      join(stage, 'without.mp4'),
      join(stage, 'listen.html'),
      other ? join(stage, 'alternate.mp4') : undefined,
      {
        'selected.mp4': [{ id, ...(review?{sourceDecision:'add'}:{}),lock: true }],
        'without.mp4': [{ id, ...(review?{sourceDecision:'reuse'}:{mute:true}), lock: true }],
        ...(other && { 'alternate.mp4': [{ id, ...(review?{sourceDecision:'add'}:{}),soundId: other, lock: true }] }),
      },
    );
    await rename(stage, dest);
    return { desk: join(dest, 'listen.html'), cue: id, selected: cue.soundId, alternative: other ?? null };
  } finally {
    await rm(stage, { recursive: true, force: true });
  }
}
