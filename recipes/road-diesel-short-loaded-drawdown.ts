import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-diesel-loaded.ts';

export default {
  id: "road-diesel-short-loaded-drawdown",
  name: "Road diesel short loaded drawdown",
  category: "Vehicles & Engines",
  tags: ["road", "diesel", "short", "loaded", "drawdown", "vehicle"],
  loopable: false,
  durationSec: 4.5,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 4.50, .92, .14, 6390, .004, .43],
      ["contact", "iron", 0, .062, .11, 417, .001],
    ]);
  },
} satisfies SoundRecipe;
