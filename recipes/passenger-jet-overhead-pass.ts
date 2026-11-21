import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-jet-pass.ts';

export default {
  id: "passenger-jet-overhead-pass",
  name: "Passenger Jet Overhead Pass",
  category: "Aircraft",
  tags: ["passenger", "jet", "overhead", "pass"],
  loopable: false,
  durationSec: 7.6,
  targetRmsDbfs: -22,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 7.50, .93, .04, 12500, .027, .33],
    ]);
  },
} satisfies SoundRecipe;
