import { mix } from '../engine/dsp.ts';
import { airTransient } from './_shared/air-transients.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-fighter-rise.ts';

export default {
  id: "arcade-missile-long-bright-thrust-departure",
  name: "Arcade missile long bright thrust departure",
  category: "Missiles",
  tags: ["arcade", "missile", "long", "bright", "thrust", "departure", "projectile", "flight", "whoosh"],
  loopable: false,
  durationSec: 2.07,
  targetRmsDbfs: -22,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = airTransient(ctx, {
      motion: "launch", focus: 0, width: .36, whistle: 292,
      weight: .72, cutoff: 4930, reflection: .07,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, .10, 1.91, .33, .16, 4430, .058, .45],
      ["brush", "air", .21, 1.35, .42, 2980, .08],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
