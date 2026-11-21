import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/physical-light-switch.ts';
import source2 from './_recordings/leather-strap-flex.ts';

export default {
  id: "dashboard-vent-dial-sweep",
  name: "Dashboard Vent Dial Sweep",
  category: "Vehicles & Engines",
  tags: ["dashboard", "vent", "dial", "sweep", "vehicle"],
  loopable: false,
  durationSec: 0.83,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["grains", "rubber", 0, .52, .73, 764, 5],
      ['clip', source, .07, .15, .51, 0, 6300],
      ['clip', source2, .255, .49, .26, .085, 4800],
    ]);
  },
} satisfies SoundRecipe;
