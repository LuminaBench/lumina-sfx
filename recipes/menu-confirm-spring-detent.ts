import { mix } from '../engine/dsp.ts';
import { interfaceFeedback } from './_shared/interface-feedback.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-button.ts';

export default {
  id: "menu-confirm-spring-detent",
  name: "Menu confirm spring detent",
  category: "Footsteps & UI",
  tags: ["menu", "confirm", "spring", "detent", "ui", "interface"],
  loopable: false,
  durationSec: 0.174,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = interfaceFeedback(ctx, params.intensity, [
      [.021, 286, .016, .57, "plastic"],
      [0, 684, .011, .32, "wood"],
    ]);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .090, .63, .001, 10500, .001, .014],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
