import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-microclick.ts';

export default editorContact(
  "quiet-mouse-press", "Silent mouse single press",
  ["device", "launch", "video", "mouse", "pointer", "damped", "single", "click", "down"], 0.067, attack,
  {"bodyHz": 350, "decayMs": 6, "cutoffHz": 2800, "snap": 0.56, "rattle": 0.01},
  [
    {"at": 0, "weight": 1, "pitch": 1}
  ],
);
