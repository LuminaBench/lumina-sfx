import type { SoundRecipe } from '../engine/types.ts';
import { energyShot } from './_shared/scifi.ts';

export default {
  id: "ion-blaster-shot", name: "Ion Blaster Shot", category: 'Sci-Fi & UI',
  tags: ["sci-fi","blaster","laser","electric"], loopable: false, durationSec: 0.51,
  params: { charge: { label: "Charge", min: 0, max: 1, default: 0.68 } },
  targetRmsDbfs: -19,
  render(ctx, { params }) {
    return energyShot(ctx, { from: 1760 + params.charge * 380, to: 440, bend: 0.035, decay: 0.077, grit: 0.37, body: 0.61 });
  },
} satisfies SoundRecipe;
