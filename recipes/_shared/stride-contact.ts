import { biquad, mix } from '../../engine/dsp.ts';
import { renderRecording, type RecordedClip } from '../../engine/recording.ts';
import type { FootstepRecipe } from '../../engine/footsteps.ts';

/** Each take is one complete sole contact. Shape its heel and roll in place. */
export function strideContact(surface: string, tags: string[], clip: RecordedClip, target: number,
  duration: number, dampSole?: RecordedClip): FootstepRecipe {
  return {
    id: 'stride-' + surface, name: surface[0].toUpperCase() + surface.slice(1) + ' alternating foot contact',
    category: 'Footsteps & UI', tags: ['step', 'footstep', 'movement', 'stride', 'left', 'right', 'walk', 'sprint', surface, ...tags],
    contains: ['one shoe contact'], markers: { plant: 0 }, perspective: 'close ground',
    takeCount: clip.takes.length, durationSec: duration, loopable: false, mixRole: 'foley', targetRmsDbfs: target,
    recording: clip.credit, additionalRecordings: dampSole ? [dampSole.credit] : undefined,
    params: {
      gait: {label: 'Sneak / walk / sprint', min: 0, max: 1, default: .5},
      boot: {label: 'Soft shoe to firm boot', min: 0, max: 1, default: .4},
      weight: {label: 'Load carried by the foot', min: 0, max: 1, default: .5},
      wetness: {label: 'Surface dampness', min: 0, max: 1, default: 0},
      scuff: {label: 'Lateral or reverse sole contact', min: 0, max: 1, default: 0},
    },
    render(ctx, {seed, params}) {
      const {gait, boot, weight, wetness, scuff} = params;
      const speed = 0.92 + gait * .16 - weight * .044 + scuff * .04;
      const out = renderRecording(ctx, clip, {seed, speed, cutoffHz:
        (6600 + gait * 4100 + boot * 2000) * (1 - .33 * wetness)});
      const removeRumble = biquad('highpass', 38, .707, ctx.sampleRate);
      const body = biquad('lowpass', 340 + 120 * boot, .71, ctx.sampleRate);
      const decay = Math.exp(-1 / (ctx.sampleRate * (.026 + .02 * weight)));
      let heel = 1;
      for (let i = 0; i < out.length; i++) {
        const sample = removeRumble(out[i]);
        const low = body(sample);
        // Firmer soles load the early heel. A sideways plant stresses the later scrape.
        const edge = .64 + boot * .38 + gait * .20 + heel * (.34 * gait - .24 * scuff);
        out[i] = (sample - low) * edge + low * (.83 + weight * .60 + heel * boot * .25);
        out[i] *= 1 + scuff * .26 * (1 - heel);
        heel *= decay;
      }
      if (dampSole && wetness > 0) {
        // Only the wet sole's release, tucked into the same contact.
        const wet = renderRecording(ctx, dampSole, {seed, startSec: .09, speed: 1.04, cutoffHz: 4600});
        const frames = Math.min(wet.length, Math.round(.14 * ctx.sampleRate));
        for (let i = 0; i < frames; i++) wet[i] *= Math.min(1, i / (.009 * ctx.sampleRate)) * (1 - i / frames) ** 2;
        mix(out, wet.subarray(0, frames), wetness * .18, Math.round(ctx.sampleRate * .045));
      }
      return out;
    },
  };
}
