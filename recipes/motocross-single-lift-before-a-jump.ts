import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/motion-yamaha-stroke.ts';
import loaded from './_recordings/response-trail-bike-surge.ts';

export default {
  id: 'motocross-single-lift-before-a-jump',
  name: 'Motocross single lift before a jump',
  category: 'Vehicles & Engines',
  tags: ["vehicle", "piston", "engine", "lift", "motocross", "single", "before", "a", "jump"],
  loopable: false,
  durationSec: 1.39,
  targetRmsDbfs: -24,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: .5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: .55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    return propulsion(ctx, seed, params.intensity, params.rpm, 'lift', {
      kind: 'piston', pulseHz: [17, 104], timbre: 0.88, idleWindow: [0.32, 0.94], powerWindow: [0.16, 0.93],
    }, idle, loaded);
  },
} satisfies SoundRecipe;
