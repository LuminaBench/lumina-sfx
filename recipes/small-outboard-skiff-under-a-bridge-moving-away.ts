import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-bow.ts';
import source2 from './_recordings/field-diesel-idle.ts';

export default {
  id: "small-outboard-skiff-under-a-bridge-moving-away",
  name: "Small Outboard Skiff under a Bridge Moving Away",
  category: "Water & Fire",
  tags: ["small", "outboard", "skiff", "under", "bridge", "moving", "away"],
  loopable: false,
  durationSec: 5.2,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.19, 0.86, 0.34, 2806, 0.022, 0.76],
      ["brush", "water", 0.34, 4.21, 0.3, 510, 0.19],
      ['clip', source2, 0.12, 4.75, 0.23, 0.28, 2254, 0.098, 0.77],
    ]);
  },
} satisfies SoundRecipe;
