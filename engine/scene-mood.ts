import type { SoundRecipe } from './types.ts';

export type SceneMood = 'neutral' | 'calm' | 'dramatic';
export type SceneRole = 'bed' | 'focus' | 'accent';

// Gain is relative to the authored mix. Cutoffs soften distant detail without moving sync points.
export const sceneMoods = {
  neutral:  { bed: [1, 0],    focus: [1, 0],    accent: [1, 0] },
  calm:     { bed: [1, 6800], focus: [1, 9000], accent: [0.40, 3000] },
  dramatic: { bed: [0.78, 9200], focus: [1.10, 0], accent: [1.40, 0] },
} as const;
export function defaultSceneRole(recipe: SoundRecipe): SceneRole {
  if (recipe.loopable || recipe.mixRole === 'ambience') return 'bed';
  return recipe.mixRole === 'impact' ? 'accent' : 'focus';
}
