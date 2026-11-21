import { mix } from '../engine/dsp.ts';
import { interfaceFeedback } from './_shared/interface-feedback.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-clank-close.ts';
import source2 from './_recordings/response-rocker.ts';

export default {
  id: "mechanical-warning-bell-sharp-trip",
  name: "Mechanical warning bell sharp trip",
  category: "Sci-Fi & UI",
  tags: ["mechanical", "warning", "bell", "sharp", "trip", "alert", "alarm"],
  loopable: false,
  durationSec: 1.17,
  targetRmsDbfs: -26.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = interfaceFeedback(ctx, params.intensity, [
      [0, 623, .17, .90, "metal"],
      [.261, 599, .086, .41, "metal"],
    ]);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .286, .56, .025, 6900, .001, .075],
      ['clip', source2, .73, .10, .37, 0, 5200, .001, .021],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
