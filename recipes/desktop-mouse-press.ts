import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-microclick.ts';

export default editorContact(
  "desktop-mouse-press", "Desktop mouse single press",
  ["device", "launch", "video", "mouse", "pointer", "microswitch", "single", "click", "down"], 0.067, attack,
  {"bodyHz": 790, "decayMs": 6, "cutoffHz": 8400, "snap": 1.3, "rattle": 0.031},
  [
    {"at": 0, "weight": 1, "pitch": 1}
  ],
);
