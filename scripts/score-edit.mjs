#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { publishAsset } from './audio-export.mjs';
import { selectionProfile, listeningVotes } from './selection-profile.mjs';
import { planEdit, reviseEdit } from './edit-score.mjs';

const usage =
  'score-edit.mjs inspect VIDEO --out DIR | plan TIMELINE --out PLAN [--profile FILE] [--source VIDEO] | audition PLAN --source VIDEO --cue ID [--alternative ID] --out DIR | revise PLAN --changes FILE --out NEW_PLAN | render PLAN --out STEM.wav | mix VIDEO --stem STEM.wav --out PREVIEW.mp4 [--audio-stream 0] | compare MIX_A.mp4 --against MIX_B.mp4 --out DESK.html';
async function main() {
  const {
    values: v,
    positionals: [command, file, ...rest],
  } = parseArgs({
    allowPositionals: true,
    options: {
      source: { type: 'string' },
      cue: { type: 'string' },
      alternative: { type: 'string' },
      against: { type: 'string' },
      out: { type: 'string' },
      profile: { type: 'string' },
      changes: { type: 'string' },
      stem: { type: 'string' },
      'audio-stream': { type: 'string' },
      help: { type: 'boolean' },
    },
  });
  if (v.help) {
    console.log(usage);
    return;
  }
  if (!file || !v.out || rest.length) throw Error(usage);
  if (command === 'compare') {
    if (!v.against) throw Error(usage);
    const { comparePictures } = await import('./edit-media.mjs');
    console.log(JSON.stringify(await comparePictures(file, v.against, v.out)));
    return;
  }
  if (command === 'inspect' || command === 'mix') {
    const { inspectPicture, mixPicture } = await import('./edit-media.mjs');
    if (command === 'mix' && !v.stem) throw Error(usage);
    console.log(
      JSON.stringify(
        command === 'inspect'
          ? await inspectPicture(file, v.out)
          : await mixPicture(file, v.stem, v.out, Number(v['audio-stream'] ?? 0)),
      ),
    );
    return;
  }
  const read = async (f) => JSON.parse(await readFile(f, 'utf8'));
  const input = await read(file);
  const { sounds } = await read(new URL('../catalog.json', import.meta.url));
  if (command === 'audition') {
    if (!v.source || !v.cue) throw Error(usage);
    const { auditionCue } = await import('./edit-audition.mjs');
    console.log(
      JSON.stringify(
        await auditionCue(
          input,
          sounds,
          v.source,
          v.cue,
          v.alternative,
          v.out,
          Number(v['audio-stream'] ?? 0),
        ),
      ),
    );
    return;
  }
  if (command === 'render') {
    const { renderEdit } = await import('./edit-render.mjs');
    console.log(JSON.stringify(await renderEdit(input, sounds, v.out)));
    return;
  }
  let result;
  if (command === 'plan') {
    const profile = await selectionProfile(v.profile),
      { votes = {} } = await listeningVotes(profile.votes);
    const track =
      v.source &&
      (await (await import('./edit-track.mjs')).measureTrack(v.source, Number(v['audio-stream'] ?? 0)));
    result = planEdit(input, sounds, profile, votes, track);
  } else if (command === 'revise' && v.changes) result = reviseEdit(input, await read(v.changes), sounds);
  else throw Error(usage);
  await publishAsset(resolve(v.out), Buffer.from(JSON.stringify(result, null, 2) + '\n'));
  console.log(
    JSON.stringify({ file: resolve(v.out), decisions: result.cues.map((c) => [c.id, c.decision]) }),
  );
}
main().catch((e) => {
  console.error(e.message);
  process.exitCode = 1;
});
