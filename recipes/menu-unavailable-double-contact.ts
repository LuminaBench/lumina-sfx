import { mix } from '../engine/dsp.ts';
import { interfaceFeedback } from './_shared/interface-feedback.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-microclick.ts';

export default {
  id: "menu-unavailable-double-contact",
  name: "Menu unavailable double contact",
  category: "Footsteps & UI",
  tags: ["menu", "unavailable", "double", "contact", "ui", "interface"],
  loopable: false,
  durationSec: 0.185,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = interfaceFeedback(ctx, params.intensity, [
      [0, 432, .013, .76, "wood"],
      [.064, 327, .014, .56, "felt"],
    ]);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .041, .29, .001, 4700, .001, .007],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
