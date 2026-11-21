import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-hydraulic-start.ts';

export default {
  id: "air-pulse-prop-seal-vents-and-cools",
  name: "Air-pulse prop seal vents and cools",
  category: "Weapons",
  tags: ["air", "pulse", "prop", "seal", "vents", "cools"],
  loopable: false,
  durationSec: 1.3,
  targetRmsDbfs: -30,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.17, .53, .07, 6050, .004, .23],
      ["contact", "iron", 0, .079, .51, 1040, .001],
      ["brush", "air", .053, 1.10, .85, 2310, .017],
      ["brush", "air", .62, .64, .23, 1210, .024],
    ]);
  },
} satisfies SoundRecipe;
