import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-airliner-approach.ts';

export default {
  id: "high-jet-contrail-distant-loop",
  name: "High jet contrail distant loop",
  category: "Aircraft",
  tags: ["high", "jet", "contrail", "distant", "flight"],
  loopable: true,
  durationSec: 6.1,
  targetRmsDbfs: -35,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 156, edge: 660, drift: .21, density: 5, material: "air", texture: .09,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 6.1, .41, .31, 1150, 0, .16],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
