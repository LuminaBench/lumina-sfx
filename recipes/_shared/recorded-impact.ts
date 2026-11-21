import { mix } from '../../engine/dsp.ts';
import { renderRecording } from '../../engine/recording.ts';
import type { RecordedClip } from '../../engine/recording.ts';
import type { SoundRecipe } from '../../engine/types.ts';

interface FoleyLayer {
  clip: RecordedClip;
  at: number;
  span: number;
  gain: number;
  cutoff: number;
  speed: number;
}

// Set the recorded attack relative to the local dry design, independently of the
// mastering level and of differences in headroom among the source recordists.
export function withImpactFoley(base: SoundRecipe, layers: readonly FoleyLayer[]): SoundRecipe {
  const credits = [base.recording, ...base.additionalRecordings ?? [], ...layers.map(l => l.clip.credit)];
  const unique = [...new Map(credits.filter(c => c !== undefined).map(c => [c.url, c])).values()];
  return {
    ...base, recording: unique[0], additionalRecordings: unique.slice(1),
    render(ctx, opts) {
      const dry = base.render(ctx, opts);
      let dryPeak = 0;
      for (const x of dry) dryPeak = Math.max(dryPeak, Math.abs(x));
      for (const [index, layer] of layers.entries()) {
        const at = Math.round(layer.at * ctx.sampleRate);
        const frames = Math.min(dry.length-at, Math.round(layer.span*ctx.sampleRate));
        if (frames < 1) continue;
        const take = renderRecording({ ...ctx, frames }, layer.clip, {
          seed: opts.seed + index, speed: layer.speed, cutoffHz: layer.cutoff,
        });
        let peak = 0;
        for (const x of take) peak = Math.max(peak, Math.abs(x));
        const fade = Math.min(frames/3, ctx.sampleRate*.023);
        for (let i = 0; i < frames; i++) {
          take[i] *= Math.min(1, (frames-1-i)/fade, i / Math.max(1, ctx.sampleRate*.00018));
        }
        if (peak > .001) mix(dry, take, dryPeak * layer.gain / peak, at);
      }
      return dry;
    },
  };
}
