import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/backfill-furrow.ts';
import source2 from './_recordings/seed-packet-rustle.ts';

export default {
  id: "sifting-flour-into-a-bowl",
  name: "Sifting Flour into a Bowl",
  category: "Props & Interactions",
  tags: ["sifting", "flour", "bowl"],
  loopable: false,
  durationSec: 0.95,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .75, .63, .05, 5300],
      ['clip', source2, .035, .58, .28, .02, 7900],
      ["grains", "stone", .10, .58, .20, 2300, 20],
      ["contact", "glass", .59, .19, .17, 570, .006],
    ]);
  },
} satisfies SoundRecipe;
