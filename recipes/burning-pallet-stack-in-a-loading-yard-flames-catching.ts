import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-inferno.ts';
import wash from './_recordings/atlas-fire.ts';
import detail from './_recordings/wooden-crate-smash.ts';

export default {
  id: "burning-pallet-stack-in-a-loading-yard-flames-catching", name: "Burning pallet stack in a loading yard — flames catching", category: "Water & Fire",
  tags: ["fire", "field-recording", "open", "flames catching", "burning", "pallet", "stack", "in"], loopable: false, durationSec: 5.6,
  mixRole: "ambience", targetRmsDbfs: -24,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.72 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 4100, detailHz: 7200, spacing: 2.41, depth: .58, space: "open" }, "surge");
  },
} satisfies SoundRecipe;
