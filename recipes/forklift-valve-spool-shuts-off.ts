import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-hydraulic-start.ts';

export default {
  id: "forklift-valve-spool-shuts-off",
  name: "Forklift valve spool shuts off",
  category: "Vehicles & Engines",
  tags: ["forklift", "valve", "spool", "shuts", "vehicle"],
  loopable: false,
  durationSec: 0.9,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .81, .82, .13, 8800, .002, .14],
      ["contact", "iron", 0, .046, .46, 1310, .0008],
      ["brush", "air", .27, .55, .24, 2200, .007],
    ]);
  },
} satisfies SoundRecipe;
