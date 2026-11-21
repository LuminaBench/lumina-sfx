import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/motion-saturn-idle.ts';
import loaded from './_recordings/demo-sports-gear.ts';

export default {
  id: 'club-racer-hatchback-pit-lane-limiter-entry',
  name: 'Club racer hatchback pit lane limiter entry',
  category: 'Vehicles & Engines',
  tags: ["vehicle", "piston", "engine", "settle", "club", "racer", "hatchback", "pit", "lane", "limiter", "entry"],
  loopable: false,
  durationSec: 2.4,
  targetRmsDbfs: -25,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'settle', {
      kind: 'piston', pulseHz: [40, 270], timbre: 0.82, idleWindow: [0.23, 0.8], powerWindow: [0.18, 0.92],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
