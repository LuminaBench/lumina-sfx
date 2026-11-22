import { biquad, layer } from '../engine/dsp.ts';
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
    const board = biquad('bandpass', hz, .85, ctx.sampleRate);
    const edge = biquad('highpass', 2400, .72, ctx.sampleRate);
    for (let i = 0; i < out.length; i++) {
      const heel = out[i];
      out[i] += board(heel) * .55 + edge(heel) * .29;
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
