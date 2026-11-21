import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/leather-strap-flex.ts';
import source2 from './_recordings/chain-rattle-short.ts';

export default {
  id: "parachute-harness-shift",
  name: "Parachute Harness Shift",
  category: "Weather & Ambience",
  tags: ["parachute", "harness", "shift", "ambience"],
  loopable: false,
  durationSec: 0.97,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .68, .85, .038, 7900],
      ['clip', source2, .23, .52, .23, .053, 5200],
      ["contact", "cloth", .52, .24, .24, 688, .016],
    ]);
  },
} satisfies SoundRecipe;
