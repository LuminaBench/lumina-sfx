import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-turbo-pass.ts';

import gear from './_recordings/demo-sports-gear.ts';

export default {
  id: "turbo-blow-off-curbside-pass",
  name: "Turbo blow-off curbside pass",
  category: "Vehicles & Engines",
  tags: ["turbo", "blow", "curbside", "pass", "car", "engine", "vehicle"],
  loopable: false,
  durationSec: 1.58,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source, gear),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.53, 1, .035, 11600, .0015, .10],
      ['clip', gear, .034, .23, .26, .71, 2100, .012, .035],
      ['clip', source, .069, 1.36, .17, .035, 3700, .005, .17],
      ['brush', 'air', .28, .20, .043, 1820, .014],
    ]);
  },
} satisfies SoundRecipe;
