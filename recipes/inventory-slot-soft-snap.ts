import { mix } from '../engine/dsp.ts';
import { interfaceFeedback } from './_shared/interface-feedback.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-button.ts';

export default {
  id: "inventory-slot-soft-snap",
  name: "Inventory slot soft snap",
  category: "Footsteps & UI",
  tags: ["inventory", "slot", "soft", "snap", "ui", "interface"],
  loopable: false,
  durationSec: 0.197,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = interfaceFeedback(ctx, params.intensity, [
      [0, 575, .027, .63, "plastic"],
      [.043, 369, .017, .80, "felt"],
    ]);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, .038, .096, .25, 0, 4850, .001, .024],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
