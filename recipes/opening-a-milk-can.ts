import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-heavy-hatch.ts';
import source2 from './_recordings/field-jar-contact.ts';

export default {
  id: "opening-a-milk-can",
  name: "Opening a Milk Can",
  category: "Props & Interactions",
  tags: ["opening", "milk", "can"],
  loopable: false,
  durationSec: 0.92,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .645, .75, .028, 10800],
      ['clip', source2, .16, .43, .33, .15, 8200],
      ["contact", "iron", .31, .37, .23, 435, .002],
    ]);
  },
} satisfies SoundRecipe;
