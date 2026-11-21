import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/motion-harbor-hydrophone.ts';
import wash from './_recordings/atlas-pebble.ts';
import detail from './_recordings/atlas-bubbles.ts';

export default {
  id: "surf-heard-below-a-reef-ledge-water-receding", name: "Surf heard below a reef ledge — water receding", category: "Water & Fire",
  tags: ["water", "field-recording", "underwater", "water receding", "surf", "heard", "below", "a"], loopable: false, durationSec: 4.95,
  mixRole: "ambience", targetRmsDbfs: -25,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.52 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 550, detailHz: 1080, spacing: 1.41, depth: .82, space: "underwater" }, "retreat");
  },
} satisfies SoundRecipe;
