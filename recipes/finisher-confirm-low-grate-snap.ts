import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "finisher-confirm-low-grate-snap",
  name: "Finisher confirm low grate snap",
  category: "Footsteps & UI",
  tags: ["finisher", "confirm", "low", "grate", "snap", "event", "combat", "feedback", "kill-confirm", "elimination", "kill"],
  loopable: false,
  durationSec: 0.392,
  targetRmsDbfs: -22,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "iron", 0, .08, .73, 1470, .00066],
      ["brush", "iron", 0, .143, .37, 1770, .003],
      ["tone", .028, .267, .49, 149, 47, .002, .57],
      ["contact", "iron", .143, .15, .74, 417, .001],
      ["contact", "glass", .145, .10, .46, 2020, .001],
    ]);
  },
} satisfies SoundRecipe;
