import { mix } from '../engine/dsp.ts';
import { interfaceFeedback } from './_shared/interface-feedback.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-microclick.ts';

export default {
  id: "arcade-elimination-glass-grit-seal",
  name: "Arcade elimination glass grit seal",
  category: "Footsteps & UI",
  tags: ["arcade", "elimination", "glass", "grit", "seal", "event", "combat", "feedback", "kill-confirm", "kill"],
  loopable: false,
  durationSec: 0.291,
  targetRmsDbfs: -23.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = interfaceFeedback(ctx, params.intensity, [
      [0, 449, .042, .71, "ceramic", -.16],
      [.050, 382, .023, .47, "wood"],
    ]);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .043, .51, 0, 10800, .0007, .008],
      ["contact", "glass", 0, .051, .62, 1890, .00055],
      ["grains", "glass", .12, .132, .22, 2090, 5],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
