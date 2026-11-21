import { mix } from '../engine/dsp.ts';
import { interfaceFeedback } from './_shared/interface-feedback.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-button.ts';

export default {
  id: "toggle-enabled-crisp-upward-tick",
  name: "Toggle enabled crisp upward tick",
  category: "Footsteps & UI",
  tags: ["toggle", "enabled", "crisp", "upward", "tick", "ui", "interface"],
  loopable: false,
  durationSec: 0.119,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = interfaceFeedback(ctx, params.intensity, [
      [.014, 820, .019, .52, "ceramic"],
    ]);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .092, .59, 0, 9620, .001, .02],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
