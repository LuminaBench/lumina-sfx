import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-tin.ts';
import wash from './_recordings/atlas-hail.ts';
import detail from './_recordings/atlas-drain.ts';

export default {
  id: "hail-rattling-in-a-zinc-gutter-unbroken-rattle-loop", name: "Hail rattling in a zinc gutter — unbroken rattle", category: "Weather & Ambience",
  tags: ["hail", "field-recording", "passage", "unbroken rattle", "rattling", "in", "a"], loopable: true, durationSec: 6.38,
  mixRole: "ambience", targetRmsDbfs: -24,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.61 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 5950, detailHz: 8450, spacing: .33, depth: .67, space: "passage" }, "steady");
  },
} satisfies SoundRecipe;
