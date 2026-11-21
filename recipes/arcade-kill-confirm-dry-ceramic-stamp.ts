import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "arcade-kill-confirm-dry-ceramic-stamp",
  name: "Arcade kill confirm dry ceramic stamp",
  category: "Footsteps & UI",
  tags: ["arcade", "kill", "confirm", "dry", "ceramic", "stamp", "event", "combat", "feedback", "kill-confirm", "elimination"],
  loopable: false,
  durationSec: 0.217,
  targetRmsDbfs: -22.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "glass", 0, .047, .71, 1510, .0005],
      ["tone", .014, .128, .36, 108, 53, .0019, .32],
      ["contact", "wood", .034, .113, .83, 366, .001],
      ["grains", "stone", .046, .14, .39, 1190, 5],
    ]);
  },
} satisfies SoundRecipe;
