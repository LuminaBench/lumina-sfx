import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/chain-rattle-short.ts';

export default {
  id: "cargo-drone-net-release",
  name: "Cargo Drone Net Release",
  category: "Sci-Fi & UI",
  tags: ["cargo", "drone", "net", "release"],
  loopable: false,
  durationSec: 1.15,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["motor", 0, .49, .47, 414, 222, .028, .77],
      ['clip', source, .23, .66, .36, .08, 5700],
      ["grains", "rubber", .32, .65, .66, 544, 12],
      ["contact", "rubber", .54, .32, .27, 171, .008],
    ]);
  },
} satisfies SoundRecipe;
