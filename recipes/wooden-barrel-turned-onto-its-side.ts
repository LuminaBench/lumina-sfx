import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/barn-timber-creak.ts';
import source2 from './_recordings/wooden-chest-open.ts';
import source3 from './_recordings/slatted-crate-settle.ts';

export default {
  id: "wooden-barrel-turned-onto-its-side",
  name: "Wooden Barrel Turned onto Its Side",
  category: "Impacts",
  tags: ["wooden", "barrel", "turned", "side"],
  loopable: false,
  durationSec: 1.31,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .72, .75, .103, 5180],
      ['clip', source2, .083, .79, .46, .10, 4400],
      ["contact", "wood", .55, .63, .56, 141, .003],
      ['clip', source3, .66, .36, .36, .045, 6500],
    ]);
  },
} satisfies SoundRecipe;
