import type { SoundRecipe } from '../engine/types.ts';
import { woodFire } from './_shared/wood-fire.ts';
import burn from './_recordings/isolated-wood-flame.ts';

export default {
  id: 'campfire-crackle-loop',
  name: 'Campfire · steady wood flame',
  category: 'Weather & Ambience',
  tags: ['campfire', 'fire', 'embers', 'wood', 'flame', 'quiet', 'soft', 'crackle', 'loop'],
  soloQueries: ['fire', 'campfire', 'wood fire', 'quiet fire', 'fire crackle', 'campfire crackle'],
  components: ['fire'],
  isolation: 'isolated',
  loopable: true, sustainMode: 'evolving',
  durationSec: 7,
  mixRole: 'ambience',
  recording: burn.credit,
  params: { sparks: { label: 'Wood snap presence', min: 0, max: 1, default: .32 } },
  render(ctx, { params, seed }) {
    return woodFire(ctx, burn, seed, params.sparks, .55, 'open', 'steady', .63);
  },
} satisfies SoundRecipe;
