import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-diesel-hood.ts';

export default {
  id: "utility-diesel-fan-slips-to-idle",
  name: "Utility diesel fan slips to idle",
  category: "Vehicles & Engines",
  tags: ["utility", "diesel", "fan", "slips", "idle", "vehicle"],
  loopable: false,
  durationSec: 3.1,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 3.1, .79, .08, 2500, .017, .28],
      ["motor", 0, 1.39, .23, 368, 106, .005, .34],
      ["brush", "air", .09, 2.4, .17, 1260, .025],
    ]);
  },
} satisfies SoundRecipe;
