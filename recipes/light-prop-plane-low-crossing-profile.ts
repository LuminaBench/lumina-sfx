import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-prop-pass.ts';

export default {
  id: "light-prop-plane-low-crossing-profile",
  name: "Light prop plane low crossing profile",
  category: "Aircraft",
  tags: ["light", "prop", "plane", "low", "crossing", "profile", "flight", "aircraft"],
  loopable: false,
  durationSec: 4.3,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 4.3, .98, .02, 4900, .012, .38],
      ["brush", "air", 0, 1.15, .14, 640, .009],
    ]);
  },
} satisfies SoundRecipe;
