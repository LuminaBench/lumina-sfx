import { thunderPass } from './_shared/weather-textures.ts';
import { biquad } from '../engine/dsp.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "lightning-heard-through-a-cellar",
  name: "Lightning Heard through a Cellar",
  category: "Weather & Ambience",
  tags: ["lightning", "heard", "cellar", "ambience"],
  loopable: false,
  durationSec: 7.25,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    const fog = biquad('lowpass', 400, 0.66, ctx.sampleRate);
    const bed = thunderPass(ctx, 0.86 - params.intensity * 0.30, true).map(fog);
    return bed;
  },
} satisfies SoundRecipe;
