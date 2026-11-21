import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/leather-strap-flex.ts';

export default {
  id: "marina-mooring-line-strains-and-relaxes",
  name: "Marina mooring line strains and relaxes",
  category: "Water & Fire",
  tags: ["marina", "mooring", "line", "strains", "relaxes", "boat", "marine"],
  loopable: false,
  durationSec: 1.58,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.17, .71, .04, 6900, .003, .14],
      ["brush", "cloth", .12, .88, .35, 469, .015],
      ["contact", "wood", .87, .37, .24, 223, .01],
      ["contact", "wood", 0, .07, .15, 520, .001],
    ]);
  },
} satisfies SoundRecipe;
