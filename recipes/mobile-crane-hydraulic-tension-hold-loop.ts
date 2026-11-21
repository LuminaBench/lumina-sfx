import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-hydraulic-hold.ts';

export default {
  id: "mobile-crane-hydraulic-tension-hold-loop",
  name: "Mobile crane hydraulic tension hold loop",
  category: "Vehicles & Engines",
  tags: ["mobile", "crane", "hydraulic", "tension", "hold", "vehicle"],
  loopable: true,
  durationSec: 3.4,
  targetRmsDbfs: -31,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 200, edge: 1940, drift: .38, density: 4, material: "iron", texture: .12,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.62, .72, .025, 4130, .06, .2],
      ['clip', source, 2.17, 1.35, .25, .33, 2710, .28, 0],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
