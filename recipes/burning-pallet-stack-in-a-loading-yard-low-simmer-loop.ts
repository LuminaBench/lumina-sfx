import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-inferno.ts';
import wash from './_recordings/atlas-fire.ts';
import detail from './_recordings/wooden-crate-smash.ts';

export default {
  id: "burning-pallet-stack-in-a-loading-yard-low-simmer-loop", name: "Burning pallet stack in a loading yard — low simmer", category: "Water & Fire",
  tags: ["fire", "field-recording", "open", "low simmer", "burning", "pallet", "stack", "in"], loopable: true, durationSec: 7.68,
  mixRole: "ambience", targetRmsDbfs: -24,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.23 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 4100, detailHz: 7200, spacing: 2.41, depth: .58, space: "open" }, "scattered");
  },
} satisfies SoundRecipe;
