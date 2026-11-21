import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/demo-rotor-pass.ts';
import recording2 from './_recordings/motion-chain-link.ts';

export default {
  id: 'rotor-wash-rattles-loose-landing-pad-fence', name: 'Rotor wash rattles loose landing pad fence', category: 'Aircraft',
  tags: ["aircraft", "rotor", "wash", "rattles", "loose", "landing", "pad", "fence", "iron", "foley"], loopable: false, durationSec: 2.18,
  mixRole: 'vehicle', targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 2.12, 0.97, 3.2, 7900, 0.001, 0.09],
      ['clip', recording2, 0.28, 1.22, 0.39, 0.09, 6900, 0.006, 0.09],
      ["contact", "iron", 0.47, 0.79, 0.19, 800, 0.003],
    ]);
  },
} satisfies SoundRecipe;
