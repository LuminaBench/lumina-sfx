import { biquad, layer, TAU } from '../../engine/dsp.ts';
import { renderRecording, type RecordedClip } from '../../engine/recording.ts';
import type { SoundRecipe } from '../../engine/types.ts';

// Case resonance, decay and snap describe the mechanism independently of its gesture.
export interface Mechanism {
  bodyHz: number;
  decayMs: number;
  cutoffHz: number;
  snap: number;
  rattle: number;
  plateHz?: number;
}

export interface Contact {
  at: number;
  weight: number;
  pitch: number;
  release?: boolean;
}

export function editorContact(id: string, name: string, tags: string[], durationSec: number,
  source: RecordedClip, mechanism: Mechanism, contacts: Contact[]): SoundRecipe {
  return {
    id, name, tags, durationSec, category: 'Footsteps & UI', loopable: false, isolation: 'isolated',
    perspective: 'close and dry', contains: tags.includes('typing') ? ['typing phrase'] : ['device contact'],
    markers: { contact: 0 }, mixRole: 'interface', targetRmsDbfs: -26, recording: source.credit,
    params: { pressure: { label: 'Contact pressure', min: 0, max: 1, default: 0.45 } },
    render(ctx, { seed, params }) {
      const out = new Float32Array(ctx.frames);
      for (const [index, hit] of contacts.entries()) {
        const release = hit.release === true;
        const pitch = hit.pitch * (0.976 + ctx.random() * 0.048) * (release ? 1.19 : 1);
        const decay = mechanism.decayMs * 0.001 * (release ? 0.6 : 1);
        const at = hit.at === 0 ? 0 : hit.at + (ctx.random() - 0.5) * Math.min(.009, hit.at * .09);
        layer(ctx, out, at, Math.max(.045, decay * 6), part => {
          const sample = renderRecording(part, source, { seed: seed + index, speed: pitch,
            cutoffHz: mechanism.cutoffHz * (.76 + .45 * params.pressure) });
          const shell = biquad('lowpass', mechanism.cutoffHz, .68, part.sampleRate);
          const hz = mechanism.bodyHz * pitch;
          const plate = mechanism.plateHz ? biquad('bandpass', mechanism.plateHz, 1.2, part.sampleRate) : undefined;
          for (let i = 0; i < sample.length; i++) {
            const t = i / part.sampleRate;
            const body = Math.sin(TAU * hz * t) * Math.exp(-t / decay);
            const cap = .37 * Math.sin(TAU * hz * 2.63 * t) * Math.exp(-t / (decay * .46));
            const wire = Math.sin(TAU * hz * 4.71 * t) * Math.exp(-t / (decay * .71));
            const attack = 1 - Math.exp(-t * 4900);
            const plateAttack = plate ? plate(part.random()*2-1) * .85 * Math.exp(-t/.007) : 0;
            sample[i] = shell(plateAttack + sample[i] * mechanism.snap * (.6 + params.pressure) +
              attack * (.31 * body + cap * .19 + wire * mechanism.rattle));
          }
          return sample;
        }, hit.weight * (.9 + .1 * ctx.random()));
      }
      return out;
    },
  };
}
