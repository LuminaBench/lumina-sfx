import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-heavy-hatch.ts';

export default {
  id: "armor-plate-dropped-on-a-padded-mat",
  name: "Armor Plate Dropped on a Padded Mat",
  category: "Impacts",
  tags: ["armor", "plate", "dropped", "padded", "mat"],
  loopable: false,
  durationSec: 0.85,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .67, .66, .36, 5520],
      ["contact", "rubber", .083, .39, .72, 162, .003],
      ["contact", "iron", .396, .24, .28, 334, .006],
    ]);
  },
} satisfies SoundRecipe;
