import type { SoundRecipe } from '../engine/types.ts';
import { independentRain } from './_shared/independent-rain.ts';
import drops from './_recordings/isolated-canopy-droplets.ts';

export default {
  id: 'rainfall-open-air-clean-loop',
  name: 'Open-air rainfall · isolated steady shower',
  category: 'Weather & Ambience',
  tags: ['rain', 'storm', 'loop', 'rainfall', 'open', 'droplets', 'steady', 'heavy'],
  components: ['rain'],
  isolation: 'isolated',
  mixRole: 'ambience',
  recording: drops.credit,
  loopable: true,
  durationSec: 8.6,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Rain intensity', min: 0, max: 1, default: 0.56 } },
  render(ctx, { params }) {
    return independentRain(ctx, params.intensity, false);
  },
} satisfies SoundRecipe;
