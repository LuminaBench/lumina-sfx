import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-microclick.ts';

export default editorContact(
  "glass-trackpad-press", "Glass trackpad single press",
  ["device", "launch", "video", "trackpad", "touch", "haptic", "laptop", "single", "click", "down"], 0.067, attack,
  {"bodyHz": 950, "decayMs": 7, "cutoffHz": 4600, "snap": 0.72, "rattle": 0.014},
  [
    {"at": 0, "weight": 1, "pitch": 1}
  ],
);
