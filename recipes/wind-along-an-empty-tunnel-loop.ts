import { mix } from '../engine/dsp.ts';
import { windBed } from './_shared/weather-textures.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-station-room.ts';

export default {
  id: "wind-along-an-empty-tunnel-loop",
  name: "Wind along an Empty Tunnel",
  category: "Weather & Ambience",
  tags: ["wind", "along", "an", "empty", "tunnel", "ambience"],
  loopable: true,
  durationSec: 10.0,
  targetRmsDbfs: -33,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = windBed(ctx, 10.0, 2, 0.23 + params.intensity * 0.51, .31);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 10.075, .29, .71, 1830, 0, 0],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
