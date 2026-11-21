import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/motion-marine-engine.ts';
import loaded from './_recordings/motion-flatboat-throttle.ts';

export default {
  id: 'harbor-launch-inboard-approach-from-open-water',
  name: 'Harbor launch inboard approach from open water',
  category: 'Vehicles & Engines',
  tags: ["boat", "outboard", "engine", "approach", "harbor", "launch", "inboard", "from", "open", "water"],
  loopable: false,
  durationSec: 3.73,
  targetRmsDbfs: -24,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'approach', {
      kind: 'outboard', pulseHz: [30, 150], timbre: 0.43, idleWindow: [0.18, 0.84], powerWindow: [0.13, 0.82],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
