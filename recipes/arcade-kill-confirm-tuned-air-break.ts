import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "arcade-kill-confirm-tuned-air-break",
  name: "Arcade kill confirm tuned air break",
  category: "Footsteps & UI",
  tags: ["arcade", "kill", "confirm", "tuned", "air", "break", "event", "combat", "feedback", "kill-confirm", "elimination"],
  loopable: false,
  durationSec: 0.269,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "air", 0, .083, .84, 1040, .0007],
      ["tone", 0, .16, .54, 563, 232, .002, .49],
      ["contact", "glass", .027, .067, .62, 1750, .001],
      ["grains", "iron", .099, .12, .31, 990, 6],
    ]);
  },
} satisfies SoundRecipe;
