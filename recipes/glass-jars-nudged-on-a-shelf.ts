import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-jar-contact.ts';
import source2 from './_recordings/field-glass-lid.ts';

export default {
  id: "glass-jars-nudged-on-a-shelf",
  name: "Glass Jars Nudged on a Shelf",
  category: "Impacts",
  tags: ["glass", "jars", "nudged", "shelf"],
  loopable: false,
  durationSec: 0.67,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .52, .78, .065, 11000],
      ['clip', source2, .10, .46, .43, .015, 11000],
      ["contact", "glass", .32, .19, .20, 721, .003],
    ]);
  },
} satisfies SoundRecipe;
