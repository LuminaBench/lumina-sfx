import type { SoundRecipe } from '../engine/types.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import engine from './_recordings/isolated-bike-idle-core.ts';

export default {
  id: 'motorcycle-steady-engine-loop',
  name: 'Steady road motorcycle engine',
  category: 'Vehicles & Engines',
  tags: [
    'vehicle',
    'motorcycle',
    'motorbike',
    'piston',
    'engine',
    'cruise',
    'twin',
    'cylinder',
    'road',
    'bike',
    'pace',
    'loop',
  ],
  isolation: 'isolated',
  components: ['motorcycle-engine'],
  soloQueries: ['motorcycle engine', 'motorbike engine'],
  perspective: 'stationary exterior emitter',
  sustainMode: 'evolving',
  loopable: true,
  durationSec: 2.68,
  targetRmsDbfs: -24,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: 0.5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: 0.55 },
  },
  ...sceneCredits(engine),
  render(ctx, { seed, params }) {
    return propulsion(
      ctx,
      seed,
      params.intensity,
      params.rpm,
      'cruise',
      {
        kind: 'piston',
        pulseHz: [22, 179],
        timbre: 0.79,
        idleWindow: [0.45, 0.94],
        powerWindow: [0.13, 0.92],
      },
      engine,
      engine,
    );
  },
} satisfies SoundRecipe;
