import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-outboard-cranking.ts';

export default {
  id: "outboard-primer-cranks-and-catches",
  name: "Outboard primer cranks and catches",
  category: "Water & Fire",
  tags: ["outboard", "primer", "cranks", "catches", "boat", "marine"],
  loopable: false,
  durationSec: 4.18,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 4.18, 1, .055, 8800, .003, .23],
      ["contact", "iron", 0, .053, .15, 717, .0009],
    ]);
  },
} satisfies SoundRecipe;
