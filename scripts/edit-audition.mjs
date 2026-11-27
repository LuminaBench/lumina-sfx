import { mkdir, mkdtemp, rename, rm, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { renderEdit } from './edit-render.mjs';
import { reviseEdit } from './edit-score.mjs';
import { mixPicture, comparePictures } from './edit-media.mjs';

export async function auditionCue(
  plan,
  catalog,
  source,
  id,
  alternate,
  out,
  stream = 0,
  { quieter = false, sourceFrame } = {},
) {
  if (quieter && alternate) throw Error('Choose a quieter audition or an alternative take');
  const proposed = plan.cues.find((c) => c.id === id);
  const review = Boolean(
    proposed?.sourceEvidence &&
    (proposed.decision !== 'play' || proposed.keyDecisions?.includes('review') || sourceFrame !== undefined),
  );
  if (sourceFrame !== undefined && !review) throw Error('Choose a frame with an observed original contact');
  const change = (settings) => ({ id, ...(sourceFrame !== undefined ? { sourceFrame } : {}), ...settings });
  const without = review
    ? reviseEdit(plan, [change({ sourceDecision: 'reuse', lock: false })], catalog)
    : reviseEdit(plan, [{ id, lock: false, mute: true }], catalog);
  if (review) plan = reviseEdit(plan, [change({ sourceDecision: 'add', lock: false })], catalog);
  const cue = plan.cues.find((c) => c.id === id);
  if (cue?.decision !== 'play') throw Error('Choose a playing cue to audition');
  if (sourceFrame !== undefined && alternate)
    throw Error('Choose a quieter or original comparison for one contact');
  const other = quieter || sourceFrame !== undefined ? undefined : (alternate ?? cue.alternatives?.[0]);
  if (other && !cue.alternatives?.includes(other))
    throw Error('Choose a compatible alternative listed in the plan');
  const comparison = other ? { soundId: other } : { trimDb: -4 };
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
      ['without', without],
      [
        'alternate',
        reviseEdit(
          plan,
          [
            change({
              ...(sourceFrame !== undefined ? { sourceDecision: 'add' } : {}),
              lock: false,
              ...comparison,
            }),
          ],
          catalog,
        ),
      ],
    ];

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
      join(stage, 'alternate.mp4'),
      {
        'selected.mp4': [change({ ...(review ? { sourceDecision: 'add' } : {}), lock: true })],
        'without.mp4': [change({ ...(review ? { sourceDecision: 'reuse' } : { mute: true }), lock: true })],
        'alternate.mp4': [
          change({ ...(review ? { sourceDecision: 'add' } : {}), ...comparison, lock: true }),
        ],
      },
    );
    await rename(stage, dest);
    return {
      desk: join(dest, 'listen.html'),
      cue: id,
      selected: cue.soundId,
      alternative: other ?? null,
      ...(other ? {} : { quieterDb: -4 }),
    };
  } finally {
    await rm(stage, { recursive: true, force: true });
  }
}
