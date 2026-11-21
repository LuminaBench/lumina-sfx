import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/backfill-furrow.ts';
import source2 from './_recordings/rake-leaf-pile.ts';

export default {
  id: "raking-ash-out-of-a-hearth",
  name: "Raking Ash out of a Hearth",
  category: "Props & Interactions",
  tags: ["raking", "ash", "hearth"],
  loopable: false,
  durationSec: 0.91,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .72, .70, .013, 6200],
      ['clip', source2, .056, .69, .45, .028, 6000],
      ["grains", "soil", .17, .61, .23, 1200, 19],
    ]);
  },
} satisfies SoundRecipe;
