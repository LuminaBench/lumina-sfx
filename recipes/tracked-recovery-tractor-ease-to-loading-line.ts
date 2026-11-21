import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/motion-track-slow.ts';
import loaded from './_recordings/motion-track-roll.ts';

export default {
  id: 'tracked-recovery-tractor-ease-to-loading-line',
  name: 'Tracked recovery tractor ease to loading line',
  category: 'Vehicles & Engines',
  tags: ["vehicle", "track", "engine", "settle", "tracked", "recovery", "tractor", "ease", "to", "loading", "line"],
  loopable: false,
  durationSec: 2.49,
  targetRmsDbfs: -25,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'settle', {
      kind: 'track', pulseHz: [13, 82], timbre: 0.77, idleWindow: [0.11, 0.92], powerWindow: [0.16, 0.92],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
