import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-film-wind.ts';

export default {
  id: "projector-reel-running-loop",
  name: "Projector Reel Running",
  category: "Props & Interactions",
  tags: ["projector", "reel", "running"],
  loopable: true,
  durationSec: 8.0,
  targetRmsDbfs: -30,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 333, edge: 2180, drift: .18, density: 14.3, material: "paper", texture: .42,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["motor", 0, 8.075, .025, 94, 95, .04, .72],
      ['clip', source, 2.7, .78, .045, .01, 8400, .022, .13],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
