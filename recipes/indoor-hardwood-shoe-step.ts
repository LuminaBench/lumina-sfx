import { biquad, layer, TAU } from '../engine/dsp.ts';
import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import contact from './_recordings/isolated-hardwood-footstep.ts';

export default {
  id: 'indoor-hardwood-shoe-step', name: 'Indoor shoe footstep on a wooden floor',
  category: 'Footsteps & UI', tags: ['footstep', 'walk', 'wood', 'wooden', 'floor', 'house', 'single', 'shoe'],
  contains: ['one complete step', 'heel and sole'], perspective: 'inside a house',
  loopable: false, isolation: 'isolated', durationSec: .235, mixRole: 'foley', targetRmsDbfs: -25,
  recording: contact.credit, markers: { heel: 0, sole: .078 },
  params: { weight: { label: 'Shoe weight', min: 0, max: 1, default: .48 } },
  render(ctx, { seed, params }) {
    const weight = params.weight;
    const out = renderRecording(ctx, contact, { seed, speed: .91 + .08 * ctx.random(), cutoffHz: 5100 });
    const hz = 150 - 37 * weight + 9 * ctx.random();
    for (let i = 0; i < out.length; i++) {
      const t = i / ctx.sampleRate;
      out[i] += .28 * (1 - Math.exp(-2100*t)) * Math.exp(-t/.023) * Math.sin(TAU * hz * t);
    }
    layer(ctx, out, .078, .11, part => {
      const rubber = biquad('bandpass', 940 + 280 * weight, .75, part.sampleRate);
      return Float32Array.from({length: part.frames}, (_, i) => {
        const t = i / part.sampleRate;
        return rubber(part.random()*2-1) * (1-Math.exp(-160*t)) * Math.exp(-t/.016);
      });
    }, .26);
    return out;
  },
} satisfies SoundRecipe;
