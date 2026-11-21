import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/trim-scrub-branch.ts';

export default {
  id: "trim-scrub-branch", name: "Shears Cutting a Scrub Branch", category: "Farming",
  tags: ["branch", "prune", "brush", "shear", "twig"],
  durationSec: 0.3412, loopable: false, targetRmsDbfs: -24,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 12500 - params.distance * 7750 });
  },
} satisfies SoundRecipe;
