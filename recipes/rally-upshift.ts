import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-sport-exterior.ts';
import source2 from './_recordings/demo-sport-v8.ts';

export default {
  id: "rally-upshift",
  name: "Rally upshift",
  category: "Vehicles & Engines",
  tags: ["rally", "upshift", "vehicle"],
  loopable: false,
  durationSec: 2.94,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.23, .70, .47, 6850, .004, .12],
      ['clip', source2, 1.30, 1.64, .70, .33, 7000, .029, .30],
      ["motor", 0, 1.19, .30, 111, 230, .003, .61],
      ["motor", 1.30, 1.52, .24, 143, 214, .025, .65],
    ]);
  },
} satisfies SoundRecipe;
