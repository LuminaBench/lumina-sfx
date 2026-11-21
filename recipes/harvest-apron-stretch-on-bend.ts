import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/jacket-movement-rustle.ts';
import source2 from './_recordings/burlap-feed-sack-open.ts';

export default {
  id: "harvest-apron-stretch-on-bend",
  name: "Harvest Apron Stretch on Bend",
  category: "Footsteps & UI",
  tags: ["harvest", "apron", "stretch", "bend"],
  loopable: false,
  durationSec: 0.81,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .72, .70, .071, 7400],
      ['clip', source2, .233, .49, .42, .33, 5500],
      ["brush", "cloth", .31, .42, .28, 1260, .085],
    ]);
  },
} satisfies SoundRecipe;
