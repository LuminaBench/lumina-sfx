import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-hydraulic-start.ts';
import source2 from './_recordings/response-button.ts';

export default {
  id: "heavy-fictional-canister-swap-and-valve",
  name: "Heavy fictional canister swap and valve",
  category: "Weapons",
  tags: ["heavy", "fictional", "canister", "swap", "valve", "reload", "mechanical", "weapon"],
  loopable: false,
  durationSec: 1.07,
  targetRmsDbfs: -26.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .81, .55, .07, 4600, .003, .24],
      ["contact", "iron", 0, .097, .44, 430, .001],
      ["contact", "iron", .18, .25, .88, 230, .0025],
      ['clip', source2, .64, .09, .51, 0, 7780, .001, .022],
      ["brush", "air", .58, .43, .65, 1590, .010],
    ]);
  },
} satisfies SoundRecipe;
