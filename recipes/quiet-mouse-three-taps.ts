import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-microclick.ts';

export default editorContact(
  "quiet-mouse-three-taps", "Silent mouse three deliberate taps",
  ["device", "launch", "video", "mouse", "pointer", "damped", "triple", "repeat"], 0.39, attack,
  {"bodyHz": 350, "decayMs": 6, "cutoffHz": 2800, "snap": 0.56, "rattle": 0.01},
  [
    {"at": 0, "weight": 0.8, "pitch": 1.03},
    {"at": 0.137, "weight": 1, "pitch": 0.96},
    {"at": 0.323, "weight": 0.89, "pitch": 1.06}
  ],
);
