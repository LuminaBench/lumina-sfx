import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/isolated-demo-quadcopter-hover.ts';
import loaded from './_recordings/isolated-demo-quadcopter-run.ts';

export default {
  id: 'survey-quadcopter-full-climb-rotor-loop',
  name: 'Survey quadcopter full climb rotor loop',
  category: 'Aircraft',
  tags: ["aircraft", "fan", "engine", "load", "survey", "quadcopter", "full", "climb", "rotor", "loop"],
  loopable: true,
  durationSec: 2.52,
  targetRmsDbfs: -21,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'load', {
      kind: 'fan', pulseHz: [105, 306], timbre: 0.9, idleWindow: [0.24, 0.86], powerWindow: [0.19, 0.91],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
