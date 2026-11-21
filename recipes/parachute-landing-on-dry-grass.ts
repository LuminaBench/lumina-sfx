import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/dry-leaves-footstep.ts';
import source2 from './_recordings/demo-canopy-rustle.ts';

export default {
  id: "parachute-landing-on-dry-grass",
  name: "Parachute Landing on Dry Grass",
  category: "Weather & Ambience",
  tags: ["parachute", "landing", "dry", "grass", "ambience"],
  loopable: false,
  durationSec: 1.59,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .43, .60, .07, 6000],
      ["contact", "soil", .06, .34, .48, 245, .003],
      ['clip', source2, .24, 1.2, .41, .84, 6300, .053, .1],
    ]);
  },
} satisfies SoundRecipe;
