import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-sport-exterior.ts';
import source2 from './_recordings/demo-garage-motor.ts';

export default {
  id: "engine-fade-beyond-the-bend",
  name: "Engine Fade beyond the Bend",
  category: "Vehicles & Engines",
  tags: ["engine", "fade", "beyond", "bend", "vehicle"],
  loopable: false,
  durationSec: 5.4,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.02, .77, .01, 3000, .038, .9],
      ['clip', source2, 1.47, 3.8, .43, 2.11, 1430, .34, .90],
    ]);
  },
} satisfies SoundRecipe;
