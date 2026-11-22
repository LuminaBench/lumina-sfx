import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-microclick.ts';

export default editorContact(
  "glass-trackpad-release", "Glass trackpad release",
  ["device", "launch", "video", "trackpad", "touch", "haptic", "laptop", "lift", "up"], 0.067, attack,
  {"bodyHz": 950, "decayMs": 7, "cutoffHz": 4600, "snap": 0.72, "rattle": 0.014},
  [
    {"at": 0, "weight": 0.61, "pitch": 1.16, "release": true}
  ],
);
