import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/reviewed-motion-sailboat-cabin.ts';
import wash from './_recordings/demo-sheltered-wind.ts';
import detail from './_recordings/demo-tent-tension.ts';

export default {
  id: "wind-against-a-sail-locker-hatch-wind-dying-away", name: "Wind against a sail locker hatch — wind dying away", category: "Weather & Ambience",
  tags: ["wind", "field-recording", "interior", "wind dying away", "against", "a", "sail"], loopable: false, durationSec: 5.27,
  mixRole: "ambience", targetRmsDbfs: -25,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.52 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 1900, detailHz: 4900, spacing: 1.83, depth: .46, space: "interior" }, "retreat");
  },
} satisfies SoundRecipe;
