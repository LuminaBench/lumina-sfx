import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-wet-road.ts';
import source2 from './_recordings/field-heavy-hatch.ts';
import source3 from './_recordings/wooden-chest-shut.ts';

export default {
  id: "loaded-trailer-coming-to-rest",
  name: "Loaded Trailer Coming to Rest",
  category: "Vehicles & Engines",
  tags: ["loaded", "trailer", "coming", "rest", "vehicle"],
  loopable: false,
  durationSec: 1.91,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.42, .52, 1.79, 2200, .018, .19],
      ['clip', source2, .48, .62, .64, .33, 6000],
      ['clip', source3, .92, .62, .35, .055, 4370],
      ["contact", "wood", 1.1, .51, .21, 205, .002],
    ]);
  },
} satisfies SoundRecipe;
