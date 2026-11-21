import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-pig-snuffle.ts';
import source2 from './_recordings/bundle-dry-stalks.ts';

export default {
  id: "pig-sniffing-straw",
  name: "Pig Sniffing Straw",
  category: "Animals",
  tags: ["pig", "sniffing", "straw", "livestock"],
  loopable: false,
  durationSec: 1.22,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .95, .84, .035, 7650],
      ['clip', source2, .075, .64, .39, .135, 7500],
    ]);
  },
} satisfies SoundRecipe;
