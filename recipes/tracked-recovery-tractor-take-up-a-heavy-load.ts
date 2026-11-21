import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/motion-track-slow.ts';
import loaded from './_recordings/motion-track-roll.ts';

export default {
  id: 'tracked-recovery-tractor-take-up-a-heavy-load',
  name: 'Tracked recovery tractor take up a heavy load',
  category: 'Vehicles & Engines',
  tags: ["vehicle", "track", "engine", "roll-on", "tracked", "recovery", "tractor", "take", "up", "a", "heavy", "load"],
  loopable: false,
  durationSec: 2.23,
  targetRmsDbfs: -22,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'roll-on', {
      kind: 'track', pulseHz: [13, 82], timbre: 0.77, idleWindow: [0.11, 0.92], powerWindow: [0.16, 0.92],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
