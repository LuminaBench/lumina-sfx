import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/action-lever-cycle.ts';

export default {
  id: "habitat-airlock-bolt-retracting",
  name: "Habitat Airlock Bolt Retracting",
  category: "Sci-Fi & UI",
  tags: ["habitat", "airlock", "bolt", "retracting"],
  loopable: false,
  durationSec: 1.14,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .51, .42, .035, 7800],
      ["contact", "iron", .025, .19, .67, 592, .003],
      ["contact", "iron", .27, .24, .77, 415, .003],
      ["motor", .291, .58, .29, 224, 181, .042, .52],
      ["contact", "rubber", .83, .17, .21, 223, .003],
    ]);
  },
} satisfies SoundRecipe;
