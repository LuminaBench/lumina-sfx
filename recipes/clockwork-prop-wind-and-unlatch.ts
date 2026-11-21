import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-ratchet.ts';

export default {
  id: "clockwork-prop-wind-and-unlatch",
  name: "Clockwork prop wind and unlatch",
  category: "Weapons",
  tags: ["clockwork", "prop", "wind", "unlatch"],
  loopable: false,
  durationSec: 1.1,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .88, .68, .028, 7700, .003, .10],
      ["contact", "iron", 0, .045, .49, 875, .001],
      ["grains", "iron", .097, .63, .32, 1310, 13],
      ["contact", "wood", .785, .14, .42, 438, .0024],
      ["contact", "iron", .81, .22, .59, 980, .001],
    ]);
  },
} satisfies SoundRecipe;
