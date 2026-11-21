import { mix } from '../engine/dsp.ts';
import { interfaceFeedback } from './_shared/interface-feedback.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "headshot-feedback-single-bright-notch",
  name: "Headshot feedback single bright notch",
  category: "Footsteps & UI",
  tags: ["headshot", "feedback", "single", "bright", "notch", "event", "combat"],
  loopable: false,
  durationSec: 0.169,
  targetRmsDbfs: -26.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    const bed = interfaceFeedback(ctx, params.intensity, [
      [0, 1530, .017, .62, "ceramic", -.07],
      [.031, 315, .022, .64, "wood"],
    ]);
    const detail = scene(ctx, seed, params.intensity, [
      ["contact", "iron", 0, .047, .61, 2290, .00045],
      ["contact", "rubber", .036, .08, .53, 330, .0011],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
