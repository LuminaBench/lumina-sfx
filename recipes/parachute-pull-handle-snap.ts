import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/leather-strap-flex.ts';
import source2 from './_recordings/car-seat-belt-click.ts';

export default {
  id: "parachute-pull-handle-snap",
  name: "Parachute Pull Handle Snap",
  category: "Weather & Ambience",
  tags: ["parachute", "pull", "handle", "snap", "ambience"],
  loopable: false,
  durationSec: 0.64,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .48, .69, .095, 6750],
      ['clip', source2, .19, .38, .55, .007, 10400],
      ["contact", "cloth", .31, .25, .22, 394, .01],
    ]);
  },
} satisfies SoundRecipe;
