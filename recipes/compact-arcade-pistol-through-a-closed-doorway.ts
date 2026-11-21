import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/clarity-pistol.ts';
import foley1 from './_recordings/book-cover-shut.ts';
import { mix } from '../engine/dsp.ts';
import { arenaReport } from './_shared/arena-reports.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

const original = {
  id: "compact-arcade-pistol-through-a-closed-doorway",
  name: "Compact arcade pistol through a closed doorway",
  category: "Weapons",
  tags: ["compact", "arcade", "pistol", "closed", "doorway", "gunshot", "weapon", "fictional"],
  loopable: false,
  durationSec: 0.61,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  render(ctx, { params, seed }) {
    const bed = arenaReport(ctx, {
      span: .0036, body: 161, crack: 9980, edge: .69, action: .09, space: "behind",
      hits: [0],
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["contact", "wood", .075, .18, .17, 343, .003],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.19, gain: 1.1, cutoff: 1330, speed: 1.01 },
  { clip: foley1, at: 0.016, span: 0.12, gain: 0.24, cutoff: 980, speed: 0.89 },
]);
