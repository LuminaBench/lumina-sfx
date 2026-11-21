import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-heavy-hatch.ts';

export default {
  id: "apartment-recycling-lid-open-and-hold",
  name: "Apartment Recycling Lid Open and Hold",
  category: "Props & Interactions",
  tags: ["apartment", "recycling", "lid", "open", "hold"],
  loopable: false,
  durationSec: 0.82,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.7, 0.81, 0.014, 8400, 0.007, 0.08],
      ["brush", "iron", 0.07, 0.57, 0.25, 636.72, 0.032],
      ["contact", "iron", 0.22, 0.23, 0.38, 379, 0.002],
    ]);
  },
} satisfies SoundRecipe;
