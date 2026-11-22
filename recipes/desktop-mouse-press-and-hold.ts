import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-microclick.ts';

export default editorContact(
  "desktop-mouse-press-and-hold", "Desktop mouse press, hold and release",
  ["device", "launch", "video", "mouse", "pointer", "microswitch", "hold", "drag", "drop"], 0.557, attack,
  {"bodyHz": 790, "decayMs": 6, "cutoffHz": 8400, "snap": 1.3, "rattle": 0.031},
  [
    {"at": 0, "weight": 1, "pitch": 0.91},
    {"at": 0.49, "weight": 0.55, "pitch": 1.12, "release": true}
  ],
);
