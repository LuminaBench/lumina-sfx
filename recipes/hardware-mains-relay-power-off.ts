import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/physical-light-switch.ts';

export default {
  id: "hardware-mains-relay-power-off",
  name: "Hardware Mains Relay Power Off",
  category: "Sci-Fi & UI",
  tags: ["hardware", "mains", "relay", "power"],
  loopable: false,
  durationSec: 1.18,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .13, .63, 0, 9700],
      ["contact", "rubber", .012, .45, .62, 174, .002],
      ["tone", .105, .98, .50, 233, 42, .05, .86],
    ]);
  },
} satisfies SoundRecipe;
