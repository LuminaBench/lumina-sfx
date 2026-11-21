import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/chain-rattle-short.ts';
import source2 from './_recordings/field-heavy-hatch.ts';

export default {
  id: "truck-tailgate-chain-lowered",
  name: "Truck Tailgate Chain Lowered",
  category: "Vehicles & Engines",
  tags: ["truck", "tailgate", "chain", "lowered", "vehicle"],
  loopable: false,
  durationSec: 0.91,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .65, .87, .02, 10500],
      ['clip', source2, .38, .50, .59, .43, 7800],
      ["contact", "iron", .48, .33, .26, 510, .001],
    ]);
  },
} satisfies SoundRecipe;
