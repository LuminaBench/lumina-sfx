import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-button.ts';
import source2 from './_recordings/response-rocker.ts';

export default {
  id: "carbine-prop-reload-quick-soft-polymer-seat",
  name: "Carbine prop reload quick soft polymer seat",
  category: "Weapons",
  tags: ["carbine", "prop", "reload", "quick", "soft", "polymer", "seat", "mechanical", "weapon"],
  loopable: false,
  durationSec: 0.54,
  targetRmsDbfs: -27.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .087, .60, 0, 9700, .001, .017],
      ["brush", "rubber", .051, .207, .56, 728, .008],
      ["contact", "rubber", .19, .10, .8, 321, .0014],
      ["contact", "iron", .221, .067, .48, 1510, .001],
      ['clip', source2, .28, .09, .43, 0, 6500, .001, .021],
    ]);
  },
} satisfies SoundRecipe;
