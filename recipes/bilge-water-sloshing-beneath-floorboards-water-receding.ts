import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/reviewed-motion-sailboat-cabin.ts';
import wash from './_recordings/milestone-smallwater.ts';
import detail from './_recordings/atlas-drain.ts';

export default {
  id: "bilge-water-sloshing-beneath-floorboards-water-receding", name: "Bilge water sloshing beneath floorboards — water receding", category: "Water & Fire",
  tags: ["water", "field-recording", "interior", "water receding", "bilge", "sloshing", "beneath"], loopable: false, durationSec: 4.84,
  mixRole: "ambience", targetRmsDbfs: -25,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.52 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 1250, detailHz: 2700, spacing: 1.27, depth: .52, space: "interior" }, "retreat");
  },
} satisfies SoundRecipe;
