import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/tractor-diesel-idle-loop.ts';

export default {
  id: "light-propeller-plane-cockpit-loop",
  name: "Light Propeller Plane Cockpit",
  category: "Aircraft",
  tags: ["light", "propeller", "plane", "cockpit"],
  loopable: true,
  durationSec: 8.0,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 244, edge: 1340, drift: .188, density: 2.1, material: "air", texture: .22,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 8.075, .35, 0, 2350, 0, 0],
      ["motor", 0, 8.075, .077, 94, 91, .037, .58],
      ["motor", 0, 8.075, .039, 187, 185, .07, .36],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
