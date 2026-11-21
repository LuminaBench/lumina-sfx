import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-cessna-taxi.ts';
import source2 from './_recordings/jacket-movement-rustle.ts';

export default {
  id: "cessna-cabin-intercom-switch-and-seat-shift",
  name: "Cessna cabin intercom switch and seat shift",
  category: "Aircraft",
  tags: ["cessna", "cabin", "intercom", "switch", "seat", "shift", "flight", "plane", "aircraft"],
  loopable: false,
  durationSec: 0.83,
  targetRmsDbfs: -31,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .83, .25, 2.13, 1130, .012, .15],
      ['clip', source2, .06, .70, .62, .089, 4300, .03, .15],
      ["contact", "iron", 0, .083, .59, 1590, .00055],
    ]);
  },
} satisfies SoundRecipe;
