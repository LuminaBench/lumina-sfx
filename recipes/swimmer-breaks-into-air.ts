import type { SoundRecipe } from '../engine/types.ts';
import { waterCrossing } from './_shared/water-crossing.ts';

export default {
  id: 'swimmer-breaks-into-air', name: "Swimmer breaks back into open air", category: 'Water & Fire',
  tags: ["swimmer", "breaks", "into", "air"], contains: ["last submerged bubbles", "surface breaks", "water drains"], perspective: 'crossing waterline',
  markers: {"surface": 0.2, "drain": 0.52}, loopable: false, durationSec: 1.04,
  mixRole: 'foley', targetRmsDbfs: -23,
  params: { force: { label: 'Gesture force', min: 0, max: 1, default: 0.5 } },
  isolation: 'isolated',
  render(ctx, { params }) {
    return waterCrossing(ctx, params.force, false);
  },
} satisfies SoundRecipe;
