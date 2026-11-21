import type { SoundRecipe } from '../engine/types.ts';
import { layer } from '../engine/dsp.ts';
import { energyShot } from './_shared/scifi.ts';

export default {
  id: "pulse-laser-burst", name: "Pulse Laser Burst", category: 'Sci-Fi & UI',
  tags: ["sci-fi","laser","blaster","burst"], loopable: false, durationSec: 0.82,
  params: { pace: { label: "Pace", min: 0, max: 1, default: 0.6 } },
  targetRmsDbfs: -19,
  render(ctx, { params }) {
    const sound = new Float32Array(ctx.frames);
    for (let i = 0; i < 3; i++) layer(ctx, sound, i * (0.147 - params.pace * 0.061), 0.30, (pulse) => energyShot(pulse, { from: 2330 + i * 230, to: 580, bend: 0.021, decay: 0.034, grit: 0.26, body: 0.30 }), 1 - 0.09 * i);
    return sound;
  },
} satisfies SoundRecipe;
