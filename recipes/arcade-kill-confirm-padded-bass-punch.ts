import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "arcade-kill-confirm-padded-bass-punch",
  name: "Arcade kill confirm padded bass punch",
  category: "Footsteps & UI",
  tags: ["arcade", "kill", "confirm", "padded", "bass", "punch", "event", "combat", "feedback", "kill-confirm", "elimination"],
  loopable: false,
  durationSec: 0.223,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "wood", 0, .089, .75, 438, .00055],
      ["contact", "iron", 0, .039, .34, 2030, .00054],
      ["tone", .008, .187, .60, 157, 57, .002, .53],
      ["contact", "rubber", .032, .134, .75, 205, .001],
    ]);
  },
} satisfies SoundRecipe;
