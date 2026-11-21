import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-rocker.ts';

export default {
  id: "arcade-revolver-prop-cylinder-swings-open",
  name: "Arcade revolver prop cylinder swings open",
  category: "Weapons",
  tags: ["arcade", "revolver", "prop", "cylinder", "swings", "open", "reload", "mechanical", "weapon"],
  loopable: false,
  durationSec: 0.61,
  targetRmsDbfs: -29.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .098, .54, 0, 9700, .001, .018],
      ["brush", "iron", .06, .36, .64, 1360, .007],
      ["grains", "iron", .11, .25, .42, 1450, 5],
      ["contact", "iron", .38, .177, .54, 555, .0009],
    ]);
  },
} satisfies SoundRecipe;
