import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-two-stroke-roll.ts';

export default {
  id: "two-stroke-moped-climbs-under-load",
  name: "Two-stroke moped climbs under load",
  category: "Vehicles & Engines",
  tags: ["two", "stroke", "moped", "climbs", "under", "load", "vehicle"],
  loopable: false,
  durationSec: 5.21,
  targetRmsDbfs: -24.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.21, .99, .10, 8300, .004, .43],
    ]);
  },
} satisfies SoundRecipe;
