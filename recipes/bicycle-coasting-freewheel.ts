import type { SoundRecipe } from '../engine/types.ts';
import { sustain } from './_shared/field-layers.ts';
import freehub from './_recordings/isolated-coasting-freehub.ts';

export default {
  id: 'bicycle-coasting-freewheel',
  name: 'Coasting bicycle · freewheel pawls',
  category: 'Vehicles & Engines',
  tags: ['bicycle', 'bike', 'cycle', 'coasting', 'coast', 'freewheel', 'freehub', 'ratchet', 'pawls', 'ticking', 'rolling'],
  components: ['bicycle freewheel'],
  contains: ['bicycle freehub ratchet turning under a stationary drivetrain'],
  perspective: 'close wheel hub',
  isolation: 'isolated',
  loopable: true,
  sustainMode: 'evolving',
  durationSec: 6.3,
  mixRole: 'vehicle',
  targetRmsDbfs: -27,
  recording: freehub.credit,
  params: { speed: { label: 'Wheel speed', min: 0, max: 1, default: 0.45 } },
  render(ctx, { seed, params }) {
    return sustain(ctx, freehub, seed, 0.79 + 0.44 * params.speed, 9300);
  },
} satisfies SoundRecipe;
