import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "broken-relay-chatters-then-dies",
  name: "Broken Relay Chatters then Dies",
  category: "Sci-Fi & UI",
  tags: ["broken", "relay", "chatters", "dies"],
  loopable: false,
  durationSec: 1.34,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "iron", 0, .13, .53, 860, .001],
      ["grains", "iron", .11, .45, .56, 1400, 18],
      ["tone", .39, .44, .45, 491, 177, .013, .91],
      ["contact", "rubber", .83, .21, .31, 334, .003],
      ["grains", "glass", .88, .32, .25, 2450, 6],
    ]);
  },
} satisfies SoundRecipe;
