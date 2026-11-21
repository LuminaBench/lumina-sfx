import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-jet-takeoff.ts';

export default {
  id: "jet-interior-takeoff-rumble",
  name: "Jet Interior Takeoff Rumble",
  category: "Aircraft",
  tags: ["jet", "interior", "takeoff", "rumble"],
  loopable: false,
  durationSec: 6.4,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 6.26, .90, .31, 1220, .027, .27],
      ["motor", .2, 5.9, .039, 55, 113, 1.15, .2],
      ["grains", "rubber", .09, 2.5, .09, 212, 22],
    ]);
  },
} satisfies SoundRecipe;
