import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/water-drops-from-spout.ts';
import source2 from './_recordings/press-potting-soil.ts';

export default {
  id: "watering-seeds-with-a-dropper",
  name: "Watering Seeds with a Dropper",
  category: "Farming",
  tags: ["watering", "seeds", "dropper", "farm", "wakefall"],
  loopable: false,
  durationSec: 0.81,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "rubber", 0, .12, .31, 580, .006],
      ['clip', source, .095, .65, .87, .015, 10300],
      ['clip', source2, .28, .18, .20, .085, 6200],
    ]);
  },
} satisfies SoundRecipe;
