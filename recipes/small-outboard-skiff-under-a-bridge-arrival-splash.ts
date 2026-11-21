import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-snapwater.ts';
import source2 from './_recordings/milestone-smallwater.ts';

export default {
  id: "small-outboard-skiff-under-a-bridge-arrival-splash",
  name: "Small Outboard Skiff under a Bridge Arrival Splash",
  category: "Water & Fire",
  tags: ["small", "outboard", "skiff", "under", "bridge", "arrival", "splash"],
  loopable: false,
  durationSec: 2.02,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.81, 0.73, 0.083, 5520, 0.014, 0.18],
      ["contact", "wood", 0.17, 0.27, 0.41, 408, 0.002],
      ['clip', source2, 0.38, 1.43, 0.28, 0.22, 4600, 0.018, 0.23],
    ]);
  },
} satisfies SoundRecipe;
