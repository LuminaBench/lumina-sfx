import { mix } from '../engine/dsp.ts';
import { interfaceFeedback } from './_shared/interface-feedback.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "critical-hit-hard-ceramic-doublet",
  name: "Critical hit hard ceramic doublet",
  category: "Footsteps & UI",
  tags: ["critical", "hit", "hard", "ceramic", "doublet", "event", "combat", "feedback", "hit-marker", "hit-confirm"],
  loopable: false,
  durationSec: 0.169,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    const bed = interfaceFeedback(ctx, params.intensity, [
      [0, 1036, .013, .71, "ceramic"],
      [.052, 1361, .019, .55, "ceramic"],
    ]);
    const detail = scene(ctx, seed, params.intensity, [
      ["contact", "glass", 0, .055, .55, 1930, .00055],
      ["contact", "wood", .038, .086, .48, 380, .0012],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
