import type { RenderContext, SoundRecipe } from '../engine/types.ts';
import { envelope, layer, mix, modal, sweep, tone } from '../engine/dsp.ts';

export default {
  id: 'low-health-heartbeat-loop', name: "Low-Health Heartbeat", category: 'Footsteps & UI',
  tags: ["heartbeat","health","pulse","ui","loop"], loopable: true, durationSec: 3.2,
  params: { urgency: { label: 'Urgency', min: 0, max: 1, default: 0.72 } },
  render(ctx, { params }) {
    const sound = new Float32Array(ctx.frames);
    const renderBeat = (shot: RenderContext, hz: number, decay: number) => {
      const beat = tone(shot, (t) => sweep(hz, hz * 0.63, 0.038, t),
        (t) => envelope(t, 0.009, decay), (p) => Math.sin(p) + 0.17 * Math.sin(p * 2));
      mix(beat, modal(shot, 'flesh', hz * 1.17, decay * 0.74), 0.19);
      return beat;
    };
    for (let i = 0; i < 4; i++) {
      const at = 0.105 + i * 0.8;
      layer(ctx, sound, at, 0.42, (shot) => renderBeat(shot, 74 + params.urgency * 16, 0.057), 1);
      layer(ctx, sound, at + 0.185 - params.urgency * 0.047, 0.36, (shot) => renderBeat(shot, 92, 0.033), 0.75);
    }
    return sound;
  },
} satisfies SoundRecipe;
