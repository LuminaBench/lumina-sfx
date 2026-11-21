import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-prop-steady.ts';

export default {
  id: "light-prop-plane-distant-circuit-loop",
  name: "Light prop plane distant circuit loop",
  category: "Aircraft",
  tags: ["light", "prop", "plane", "distant", "circuit", "flight", "aircraft"],
  loopable: true,
  durationSec: 5.8,
  targetRmsDbfs: -34,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 142, edge: 648, drift: .34, density: 4, material: "air", texture: .14,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.8, .59, .04, 1180, .07, .22],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
