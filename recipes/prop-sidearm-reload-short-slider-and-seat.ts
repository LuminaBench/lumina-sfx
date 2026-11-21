import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-rocker.ts';
import source2 from './_recordings/motion-clank-close.ts';
import source3 from './_recordings/response-button.ts';

export default {
  id: "prop-sidearm-reload-short-slider-and-seat",
  name: "Prop sidearm reload short slider and seat",
  category: "Weapons",
  tags: ["prop", "sidearm", "reload", "short", "slider", "seat", "mechanical", "weapon"],
  loopable: false,
  durationSec: 0.67,
  targetRmsDbfs: -26.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .098, .69, 0, 9100, .001, .020],
      ["brush", "iron", .063, .216, .61, 1310, .008],
      ['clip', source2, .19, .298, .48, .012, 6500, .002, .08],
      ["contact", "rubber", .256, .10, .66, 303, .0014],
      ['clip', source3, .45, .087, .44, 0, 10500, .001, .018],
    ]);
  },
} satisfies SoundRecipe;
