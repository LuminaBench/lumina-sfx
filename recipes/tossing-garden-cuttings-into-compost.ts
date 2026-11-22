import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-leaf-tear.ts';
import source2 from './_recordings/backfill-furrow.ts';
import source3 from './_recordings/field-pepper-rip.ts';

export default {
  id: "tossing-garden-cuttings-into-compost",
  name: "Tossing Garden Cuttings into Compost",
  category: "Farming",
  tags: ["tossing", "garden", "cuttings", "compost", "farm"],
  loopable: false,
  durationSec: 0.93,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .39, .52, .02, 7200],
      ['clip', source2, .15, .56, .61, .015, 4800],
      ['clip', source3, .29, .48, .36, .033, 5000],
    ]);
  },
} satisfies SoundRecipe;
