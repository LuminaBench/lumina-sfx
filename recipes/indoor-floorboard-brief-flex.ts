import { biquad, TAU } from '../engine/dsp.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: 'indoor-floorboard-brief-flex', name: 'Quiet indoor floorboard creak under weight',
  category: 'Props & Interactions', tags: ['floorboard', 'floor', 'creak', 'wood', 'indoor', 'short', 'quiet'],
  contains: ['brief wood flex'], perspective: 'at floor level', loopable: false, isolation: 'isolated',
  durationSec: .212, mixRole: 'detail', targetRmsDbfs: -32,
  params: { load: { label: 'Board load', min: 0, max: 1, default: .42 } },
  render(ctx, { params }) {
    const wood = biquad('bandpass', 610 + ctx.random()*130, 2.3, ctx.sampleRate);
    const grain = biquad('lowpass', 1800, .68, ctx.sampleRate);
    let untilSlip = 0;
    return Float32Array.from({ length: ctx.frames }, (_, i) => {
      const t = i / ctx.sampleRate;
      let impulse = 0;
      if (--untilSlip <= 0) {
        impulse = .65 + .35 * ctx.random();
        untilSlip = Math.max(1, Math.round(ctx.sampleRate / (108 + 120*t + 68*params.load) * (.74 + .57*ctx.random())));
      }
      const bend = Math.exp(-t/.070) * (.8 + .2*Math.cos(TAU*7*t));
      return bend * wood(impulse + .021 * grain(ctx.random()*2-1));
    });
  },
} satisfies SoundRecipe;
