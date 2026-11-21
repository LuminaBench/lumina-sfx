import type { SoundRecipe } from '../engine/types.ts';
import { energyShot } from './_shared/scifi.ts';

export default {
  id: "plasma-cannon-shot", name: "Plasma Cannon Shot", category: 'Sci-Fi & UI',
  tags: ["sci-fi","blaster","plasma","cannon"], loopable: false, durationSec: 1.14,
  params: { weight: { label: "Weight", min: 0, max: 1, default: 0.73 } },
  targetRmsDbfs: -18,
  render(ctx, { params }) {
    return energyShot(ctx, { from: 536, to: 91, bend: 0.135, decay: 0.18, grit: 0.57, body: 0.73 + params.weight * 0.49 });
  },
} satisfies SoundRecipe;
