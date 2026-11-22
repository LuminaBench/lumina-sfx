import { sceneCredits } from './_shared/material-scenes.ts';
import { propulsion } from './_shared/propulsion.ts';
import { biquad } from '../engine/dsp.ts';
import motor from './_recordings/isolated-motion-outboard-aeration.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/isolated-motion-harbor-hydrophone.ts';

export default {
  perspective: "submerged", contains: ["underwater harbor motor"], markers: {"bed": 0},
  id: "harbor-motor-through-hydrophone-loop",
  name: "Harbor motor through hydrophone loop",
  category: "Water & Fire",
  tags: ["harbor", "motor", "hydrophone", "boat", "marine"],
  loopable: true,
  durationSec: 6.0,
  targetRmsDbfs: -31,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  isolation: 'isolated',
  ...sceneCredits(source, motor),
  render(ctx, { params, seed }) {
    const wash = propulsion(ctx, seed, params.intensity, .5, 'cruise', {
      kind: 'outboard', pulseHz: [27, 135], timbre: .46, idleWindow: [.03, .94], powerWindow: [.08, .94],
    }, source, motor);
    return wash.map(biquad('lowpass', 1750 + 680 * params.intensity, .72, ctx.sampleRate));
  },
} satisfies SoundRecipe;
