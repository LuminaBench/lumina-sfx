import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-appliance-single.ts';
import source2 from './_recordings/response-ceiling-piezo.ts';

export default {
  id: "radar-hard-lock-warning-dry-double-burst",
  name: "Radar hard lock warning dry double burst",
  category: "Sci-Fi & UI",
  tags: ["radar", "hard", "lock", "warning", "dry", "double", "burst", "alert", "alarm"],
  loopable: false,
  durationSec: 0.63,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .145, .70, .015, 3350, .001, .018],
      ['clip', source2, .208, .294, .75, .018, 6900, .001, .046],
      ["contact", "iron", 0, .05, .32, 1010, .0006],
      ["contact", "iron", .523, .066, .24, 685, .0007],
    ]);
  },
} satisfies SoundRecipe;
