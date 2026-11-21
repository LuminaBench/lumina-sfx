import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/demo-ev-surface.ts';
import loaded from './_recordings/car-wet-asphalt-pass.ts';

export default {
  id: 'electric-delivery-van-curb-idle-loop',
  name: 'Electric delivery van curb idle loop',
  category: 'Vehicles & Engines',
  tags: ["vehicle", "electric", "engine", "idle", "delivery", "van", "curb", "loop"],
  loopable: true,
  durationSec: 2.35,
  targetRmsDbfs: -25,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'idle', {
      kind: 'electric', pulseHz: [70, 530], timbre: 0.44, idleWindow: [0.08, 0.53], powerWindow: [0.22, 0.78],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
