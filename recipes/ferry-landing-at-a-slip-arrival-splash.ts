import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-snapwater.ts';

export default {
  id: "ferry-landing-at-a-slip-arrival-splash",
  name: "Ferry Landing at a Slip Arrival Splash",
  category: "Water & Fire",
  tags: ["ferry", "landing", "slip", "arrival", "splash"],
  loopable: false,
  durationSec: 2.02,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.81, 0.73, 0.083, 3240, 0.014, 0.18],
      ["contact", "wood", 0.17, 0.27, 0.41, 174.4, 0.002],
      ['clip', source, 0.38, 1.43, 0.28, 0.22, 2700, 0.018, 0.23],
    ]);
  },
} satisfies SoundRecipe;
