import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-rotor-bed.ts';

export default {
  id: "helicopter-tail-rotor-high-blade-flutter-loop",
  name: "Helicopter tail rotor high blade flutter loop",
  category: "Aircraft",
  tags: ["helicopter", "tail", "rotor", "high", "blade", "flutter", "flight"],
  loopable: true,
  durationSec: 5.1,
  targetRmsDbfs: -30,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 312, edge: 3670, drift: .37, density: 18, material: "air", texture: .42,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.22, .86, .15, 5500, 0, 0],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
