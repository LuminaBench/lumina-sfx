import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-station-room.ts';

export default {
  id: "empty-platform-between-services-loop",
  name: "Empty Platform between Services",
  category: "Vehicles & Engines",
  tags: ["empty", "platform", "between", "services", "vehicle"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -34,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 175, edge: 1120, drift: .155, density: 1.46, material: "air", texture: .15,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 9.075, .52, .65, 2850, 0, 0],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
