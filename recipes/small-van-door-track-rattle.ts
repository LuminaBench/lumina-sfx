import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/steel-drawer-open.ts';
import source2 from './_recordings/chain-rattle-short.ts';

export default {
  id: "small-van-door-track-rattle",
  name: "Small Van Door Track Rattle",
  category: "Vehicles & Engines",
  tags: ["small", "van", "door", "track", "rattle", "vehicle"],
  loopable: false,
  durationSec: 1.25,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .94, .66, .05, 6950],
      ['clip', source2, .18, .64, .34, .032, 8850],
      ["grains", "iron", .16, .74, .22, 350, 13],
    ]);
  },
} satisfies SoundRecipe;
