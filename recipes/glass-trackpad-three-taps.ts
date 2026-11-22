import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-microclick.ts';

export default editorContact(
  "glass-trackpad-three-taps", "Glass trackpad three deliberate taps",
  ["device", "launch", "video", "trackpad", "touch", "haptic", "laptop", "triple", "repeat"], 0.39, attack,
  {"bodyHz": 950, "decayMs": 7, "cutoffHz": 4600, "snap": 0.72, "rattle": 0.014},
  [
    {"at": 0, "weight": 0.8, "pitch": 1.03},
    {"at": 0.137, "weight": 1, "pitch": 0.96},
    {"at": 0.323, "weight": 0.89, "pitch": 1.06}
  ],
);
