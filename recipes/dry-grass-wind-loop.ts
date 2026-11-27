import type { SoundRecipe } from '../engine/types.ts';
import blades from './_recordings/isolated-dry-maize-leaf.ts';
import { sustain } from './_shared/field-layers.ts';
import { biquad } from '../engine/dsp.ts';

export default {
  id: 'dry-grass-wind-loop', name: 'Wind moving through dry grass', category: 'Weather & Ambience',
  tags: ['dry', 'grass', 'wind', 'breeze', 'meadow', 'field', 'blades', 'rustle', 'gust'],
  isolation: 'isolated', components: ['grass-rustle'], recording: blades.credit,
  loopable: true, sustainMode: 'evolving', durationSec: 6.5, mixRole: 'ambience', targetRmsDbfs: -31,
  params: { breeze: {label: 'Breeze', min: 0, max: 1, default: 0.4} },
  render(ctx, {seed, params}) {
    // Model thin blades from recorded dry stalk friction. The scene can supply its own gust curve.
    const sound = sustain(ctx, blades, seed, 1.14 + params.breeze * 0.18, 3600 + params.breeze * 2200, true);
    return sound.map(biquad('highpass', 370, 0.65, ctx.sampleRate));
  },
} satisfies SoundRecipe;
