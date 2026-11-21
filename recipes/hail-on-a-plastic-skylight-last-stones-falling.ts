import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-hail.ts';
import wash from './_recordings/atlas-glass.ts';
import detail from './_recordings/atlas-tin.ts';

export default {
  id: "hail-on-a-plastic-skylight-last-stones-falling", name: "Hail on a plastic skylight — last stones falling", category: "Weather & Ambience",
  tags: ["hail", "field-recording", "interior", "last stones falling", "on", "a", "plastic"], loopable: false, durationSec: 4.16,
  mixRole: "ambience", targetRmsDbfs: -24,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.52 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 5700, detailHz: 8100, spacing: .39, depth: .72, space: "interior" }, "retreat");
  },
} satisfies SoundRecipe;
