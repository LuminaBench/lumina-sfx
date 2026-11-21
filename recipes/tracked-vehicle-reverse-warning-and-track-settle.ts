import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-tracked-reverse.ts';
import source2 from './_recordings/response-appliance-single.ts';

export default {
  id: "tracked-vehicle-reverse-warning-and-track-settle",
  name: "Tracked vehicle reverse warning and track settle",
  category: "Vehicles & Engines",
  tags: ["tracked", "vehicle", "reverse", "warning", "track", "settle"],
  loopable: false,
  durationSec: 2.38,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.38, .72, 1.42, 3100, .002, .29],
      ['clip', source2, .086, .23, .34, .004, 3350, .001, .023],
      ['clip', source2, .76, .23, .37, .002, 3900, .001, .03],
      ["contact", "iron", 0, .071, .39, 300, .001],
      ["contact", "iron", 1.68, .22, .38, 285, .002],
    ]);
  },
} satisfies SoundRecipe;
