import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/clarity-field.ts';
import foley1 from './_recordings/clarity-rifle.ts';
import { mix } from '../engine/dsp.ts';
import { arenaReport } from './_shared/arena-reports.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

const original = {
  id: "arcade-scattergun-narrow-tile-room",
  name: "Arcade scattergun narrow tile room",
  category: "Weapons",
  tags: ["arcade", "scattergun", "narrow", "tile", "room", "gunshot", "weapon", "fictional"],
  loopable: false,
  durationSec: 0.98,
  targetRmsDbfs: -19.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  render(ctx, { params, seed }) {
    const bed = arenaReport(ctx, {
      span: .0175, body: 127, crack: 10100, edge: .84, action: .23, space: "hall",
      hits: [0],
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["contact", "iron", .021, .095, .17, 600, .001],
      ["brush", "stone", .066, .23, .31, 1150, .005],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.38, gain: 1.13, cutoff: 8700, speed: 0.91 },
  { clip: foley1, at: 0.031, span: 0.31, gain: 0.32, cutoff: 5250, speed: 0.98 },
]);
