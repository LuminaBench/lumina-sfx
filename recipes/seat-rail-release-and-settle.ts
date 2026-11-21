import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/steel-drawer-open.ts';
import source2 from './_recordings/car-seat-belt-click.ts';
import source3 from './_recordings/field-heavy-hatch.ts';

export default {
  id: "seat-rail-release-and-settle",
  name: "Seat Rail Release and Settle",
  category: "Vehicles & Engines",
  tags: ["seat", "rail", "release", "settle", "vehicle"],
  loopable: false,
  durationSec: 1.15,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .72, .62, .04, 5100],
      ['clip', source2, .16, .42, .49, .02, 7200],
      ['clip', source3, .57, .42, .49, .45, 7800],
    ]);
  },
} satisfies SoundRecipe;
