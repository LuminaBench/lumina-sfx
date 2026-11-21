import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-rocker.ts';
import source2 from './_recordings/response-button.ts';

export default {
  id: "prop-sidearm-reload-heavy-magazine-catch",
  name: "Prop sidearm reload heavy magazine catch",
  category: "Weapons",
  tags: ["prop", "sidearm", "reload", "heavy", "magazine", "catch", "mechanical", "weapon"],
  loopable: false,
  durationSec: 0.79,
  targetRmsDbfs: -25.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "iron", 0, .075, .5, 730, .001],
      ['clip', source, 0, .092, .60, .002, 8100, .001, .025],
      ["brush", "iron", .104, .31, .63, 821, .012],
      ["contact", "iron", .35, .19, .80, 290, .0018],
      ['clip', source2, .529, .095, .54, 0, 8500, .001, .022],
      ["contact", "iron", .571, .13, .57, 949, .0008],
    ]);
  },
} satisfies SoundRecipe;
