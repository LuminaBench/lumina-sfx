import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/motion-loader-cab.ts';
import loaded from './_recordings/motion-forklift-load.ts';

export default {
  id: 'diesel-yard-loader-two-short-positioning-moves',
  name: 'Diesel yard loader two short positioning moves',
  category: 'Vehicles & Engines',
  tags: ["vehicle", "diesel", "engine", "surge", "yard", "loader", "two", "short", "positioning", "moves"],
  loopable: false,
  durationSec: 2.41,
  targetRmsDbfs: -23,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'surge', {
      kind: 'diesel', pulseHz: [24, 138], timbre: 0.59, idleWindow: [0.17, 0.87], powerWindow: [0.21, 0.92],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
