import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-hydraulic-start.ts';

export default {
  id: "small-deck-pump-check-valve-burp",
  name: "Small deck pump check valve burp",
  category: "Water & Fire",
  tags: ["small", "deck", "pump", "check", "valve", "burp", "boat", "marine"],
  loopable: false,
  durationSec: 1.25,
  targetRmsDbfs: -30,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.15, .44, .18, 3600, .006, .17],
      ["contact", "iron", 0, .042, .45, 870, .001],
      ["motor", .054, .79, .18, 54, 69, .017, .47],
      ["contact", "water", .61, .1, .37, 266, .003],
      ["contact", "water", .865, .12, .3, 177, .003],
    ]);
  },
} satisfies SoundRecipe;
