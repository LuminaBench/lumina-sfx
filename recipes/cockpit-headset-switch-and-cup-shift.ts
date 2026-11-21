import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-clank-close.ts';
import source2 from './_recordings/jacket-movement-rustle.ts';

export default {
  id: "cockpit-headset-switch-and-cup-shift",
  name: "Cockpit headset switch and cup shift",
  category: "Aircraft",
  tags: ["cockpit", "headset", "switch", "cup", "shift", "flight"],
  loopable: false,
  durationSec: 0.61,
  targetRmsDbfs: -30,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .21, .43, .035, 7900, .003, .045],
      ['clip', source2, .085, .49, .37, .1, 4600, .03, .12],
      ["contact", "iron", 0, .055, .44, 1710, .0006],
      ["contact", "rubber", .189, .125, .31, 366, .003],
    ]);
  },
} satisfies SoundRecipe;
