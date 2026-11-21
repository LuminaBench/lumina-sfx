import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-fire.ts';
import wash from './_recordings/atlas-steam.ts';
import detail from './_recordings/atlas-fire.ts';

export default {
  id: "ember-bed-under-damp-kindling-fire-settling", name: "Ember bed under damp kindling — fire settling", category: "Water & Fire",
  tags: ["fire", "field-recording", "open", "fire settling", "ember", "bed", "under", "damp"], loopable: false, durationSec: 4.82,
  mixRole: "ambience", targetRmsDbfs: -24,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.52 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 4700, detailHz: 6400, spacing: 1.25, depth: .54, space: "open" }, "retreat");
  },
} satisfies SoundRecipe;
