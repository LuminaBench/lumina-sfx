import { mix } from '../engine/dsp.ts';
import { windBed } from './_shared/weather-textures.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-sheltered-wind.ts';
import source2 from './_recordings/demo-station-room.ts';

export default {
  id: "rooftop-dusk-air-loop",
  name: "Rooftop Dusk Air",
  category: "Weather & Ambience",
  tags: ["rooftop", "dusk", "air", "ambience"],
  loopable: true,
  durationSec: 10.0,
  targetRmsDbfs: -34,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = windBed(ctx, 10.0, 2, 0.23 + params.intensity * 0.51, .26);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 10.075, .29, 1.78, 4500, 0, 0],
      ['clip', source2, 2.67, 5.3, .09, .85, 1360, .85, 1.1],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
