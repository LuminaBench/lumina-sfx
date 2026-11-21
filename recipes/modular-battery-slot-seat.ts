import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/energy-cell-seating.ts';

export default {
  id: "modular-battery-slot-seat",
  name: "Modular Battery Slot Seat",
  category: "Sci-Fi & UI",
  tags: ["modular", "battery", "slot", "seat"],
  loopable: false,
  durationSec: 0.88,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .46, .67, .054, 9000],
      ["contact", "iron", .058, .24, .54, 518, .001],
      ["tone", .13, .29, .33, 302, 455, .012, .31],
      ["tone", .21, .29, .38, 676, 680, .018, .38],
    ]);
  },
} satisfies SoundRecipe;
