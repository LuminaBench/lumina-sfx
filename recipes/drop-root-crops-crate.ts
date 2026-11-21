import { mix } from '../engine/dsp.ts';
import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/drop-root-crops-crate.ts';
import slats from './_recordings/slatted-crate-settle.ts';

export default {
  id: "drop-root-crops-crate", name: "Roots Dropping into a Slatted Crate", category: "Farming",
  tags: ["crop", "root", "produce", "crate", "drop", "harvest"],
  durationSec: 0.75, loopable: false, targetRmsDbfs: -24,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  recording: recording.credit,
  additionalRecordings: [slats.credit],
  render(ctx, { seed, params }) {
    const sound = renderRecording(ctx, recording, { seed, cutoffHz: 6550 + params.force * 3000 });
    const contact = renderRecording(ctx, slats, { seed, cutoffHz: 8700 });
    mix(sound, contact, 0.19 + 0.11 * params.force, Math.round(ctx.sampleRate * 0.071));
    return sound;
  },
} satisfies SoundRecipe;
