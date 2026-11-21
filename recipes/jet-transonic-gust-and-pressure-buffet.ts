import { mix } from '../engine/dsp.ts';
import { airTransient } from './_shared/air-transients.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "jet-transonic-gust-and-pressure-buffet",
  name: "Jet transonic gust and pressure buffet",
  category: "Aircraft",
  tags: ["jet", "transonic", "gust", "pressure", "buffet"],
  loopable: false,
  durationSec: 2.12,
  targetRmsDbfs: -23.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  render(ctx, { params, seed }) {
    const bed = airTransient(ctx, {
      motion: "flyby", focus: .39, width: .30, whistle: 408,
      weight: .83, cutoff: 5700, reflection: 0,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["brush", "air", 0, 1.82, .48, 1940, .025],
      ["grains", "air", .24, 1.30, .61, 1280, 19],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
