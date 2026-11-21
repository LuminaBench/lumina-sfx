import { mix } from '../engine/dsp.ts';
import { interfaceFeedback } from './_shared/interface-feedback.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "stealth-takedown-quiet-wood-token",
  name: "Stealth takedown quiet wood token",
  category: "Footsteps & UI",
  tags: ["stealth", "takedown", "quiet", "wood", "token", "event", "combat", "feedback", "kill-confirm", "elimination", "kill"],
  loopable: false,
  durationSec: 0.242,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    const bed = interfaceFeedback(ctx, params.intensity, [
      [0, 385, .044, .68, "wood"],
      [.052, 288, .016, .51, "felt"],
    ]);
    const detail = scene(ctx, seed, params.intensity, [
      ["brush", "cloth", 0, .168, .39, 560, .003],
      ["contact", "wood", .061, .109, .58, 205, .001],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
