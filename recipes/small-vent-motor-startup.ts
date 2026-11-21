import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/physical-light-switch.ts';

export default {
  id: "small-vent-motor-startup",
  name: "Small Vent Motor Startup",
  category: "Sci-Fi & UI",
  tags: ["small", "vent", "motor", "startup"],
  loopable: false,
  durationSec: 1.55,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .13, .64, .001, 8200],
      ["motor", .15, 1.32, .42, 61, 147, .43, .57],
      ["brush", "air", .224, 1.22, .68, 1180, .23],
    ]);
  },
} satisfies SoundRecipe;
