import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/milestone-ocean.ts';
import wash from './_recordings/atlas-pebble.ts';
import detail from './_recordings/milestone-snapwater.ts';

export default {
  id: "surf-around-a-tidal-cave-mouth-water-receding", name: "Surf around a tidal cave mouth — water receding", category: "Water & Fire",
  tags: ["water", "field-recording", "basin", "water receding", "surf", "around", "a", "tidal"], loopable: false, durationSec: 5.32,
  mixRole: "ambience", targetRmsDbfs: -25,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.52 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 2700, detailHz: 5650, spacing: 1.89, depth: .71, space: "basin" }, "retreat");
  },
} satisfies SoundRecipe;
