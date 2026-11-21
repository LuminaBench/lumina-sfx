import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-clank-close.ts';

export default {
  id: "spent-brass-prop-bounces-on-concrete",
  name: "Spent brass prop bounces on concrete",
  category: "Weapons",
  tags: ["spent", "brass", "prop", "bounces", "concrete"],
  loopable: false,
  durationSec: 0.7,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .12, .33, .04, 8860, .002, .03],
      ["contact", "iron", 0, .097, .74, 1800, .00045],
      ["contact", "iron", .109, .085, .52, 2040, .00054],
      ["contact", "stone", .168, .063, .50, 1390, .001],
      ["grains", "iron", .21, .35, .29, 1720, 5],
    ]);
  },
} satisfies SoundRecipe;
