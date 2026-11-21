import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/steel-drawer-open.ts';
import source2 from './_recordings/field-heavy-hatch.ts';

export default {
  id: "lifting-a-bread-pan-onto-a-rack",
  name: "Lifting a Bread Pan onto a Rack",
  category: "Props & Interactions",
  tags: ["lifting", "bread", "pan", "rack"],
  loopable: false,
  durationSec: 0.89,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .48, .60, .02, 6700],
      ['clip', source2, .23, .55, .54, .22, 9800],
      ["contact", "iron", .41, .19, .33, 440, .0015],
    ]);
  },
} satisfies SoundRecipe;
