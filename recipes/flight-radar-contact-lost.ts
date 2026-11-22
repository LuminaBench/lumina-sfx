import type { SoundRecipe } from '../engine/types.ts';
import { radarSignal } from './_shared/flight-alert.ts';
export default {
  id: 'flight-radar-contact-lost',
  name: 'Flight radar contact lost',
  category: 'Sci-Fi & UI',
  mixRole: 'interface',
  isolation: 'isolated',
  tags: ['radar', 'dogfight', 'alert', 'lost'],
  loopable: false,
  durationSec: 0.31,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },

  render(ctx, { params }) {
    return radarSignal(ctx, 'lost', params.intensity);
  },
} satisfies SoundRecipe;
