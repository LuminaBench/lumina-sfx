import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-leaf-tear.ts';
import source2 from './_recordings/pull-carrot-from-loam.ts';
import source3 from './_recordings/field-garden-release.ts';
import source4 from './_recordings/shake-soil-off-roots.ts';

export default {
  id: "pulling-spring-onions-in-a-bunch",
  name: "Pulling Spring Onions in a Bunch",
  category: "Farming",
  tags: ["pulling", "spring", "onions", "bunch", "farm", "wakefall"],
  loopable: false,
  durationSec: 0.85,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3, source4),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .30, .33, .012, 9500],
      ['clip', source2, .12, .30, .90, 0, 10300],
      ['clip', source3, .25, .44, .33, .13, 9800],
      ['clip', source4, .38, .38, .38, .05, 7000],
    ]);
  },
} satisfies SoundRecipe;
