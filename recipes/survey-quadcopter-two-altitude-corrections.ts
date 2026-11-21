import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/demo-quadcopter-hover.ts';
import loaded from './_recordings/demo-quadcopter-run.ts';

export default {
  id: 'survey-quadcopter-two-altitude-corrections',
  name: 'Survey quadcopter two altitude corrections',
  category: 'Aircraft',
  tags: ["aircraft", "fan", "engine", "surge", "survey", "quadcopter", "two", "altitude", "corrections"],
  loopable: false,
  durationSec: 2.35,
  targetRmsDbfs: -23,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'surge', {
      kind: 'fan', pulseHz: [105, 306], timbre: 0.9, idleWindow: [0.24, 0.86], powerWindow: [0.19, 0.91],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
