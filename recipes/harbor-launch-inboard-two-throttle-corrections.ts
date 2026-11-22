import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/isolated-motion-marine-engine.ts';
import loaded from './_recordings/isolated-motion-flatboat-throttle.ts';

export default {
  isolation: 'isolated',
  id: 'harbor-launch-inboard-two-throttle-corrections',
  name: 'Harbor launch inboard two throttle corrections',
  category: 'Vehicles & Engines',
  tags: ["boat", "outboard", "engine", "surge", "harbor", "launch", "inboard", "two", "throttle", "corrections"],
  loopable: false,
  durationSec: 3.01,
  targetRmsDbfs: -23,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'surge', {
      kind: 'outboard', pulseHz: [30, 150], timbre: 0.43, idleWindow: [0.18, 0.84], powerWindow: [0.13, 0.82],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
