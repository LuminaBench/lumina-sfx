import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/steel-drawer-open.ts';
import source2 from './_recordings/shovel-dry-earth.ts';
import source3 from './_recordings/field-heavy-hatch.ts';

export default {
  id: "iron-pan-dragged-on-a-stone-hob",
  name: "Iron Pan Dragged on a Stone Hob",
  category: "Impacts",
  tags: ["iron", "pan", "dragged", "stone", "hob"],
  loopable: false,
  durationSec: 1.17,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .80, .53, .085, 7200],
      ['clip', source2, .06, .75, .49, .09, 5100],
      ["brush", "iron", .15, .73, .48, 570, .08],
      ['clip', source3, .64, .36, .51, .57, 8500],
    ]);
  },
} satisfies SoundRecipe;
