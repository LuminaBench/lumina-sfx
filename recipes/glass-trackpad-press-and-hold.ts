import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-microclick.ts';

export default editorContact(
  "glass-trackpad-press-and-hold", "Glass trackpad press, hold and release",
  ["device", "launch", "video", "trackpad", "touch", "haptic", "laptop", "hold", "drag", "drop"], 0.557, attack,
  {"bodyHz": 950, "decayMs": 7, "cutoffHz": 4600, "snap": 0.72, "rattle": 0.014},
  [
    {"at": 0, "weight": 1, "pitch": 0.91},
    {"at": 0.49, "weight": 0.55, "pitch": 1.12, "release": true}
  ],
);
