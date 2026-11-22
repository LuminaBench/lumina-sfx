import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-microclick.ts';

export default editorContact(
  "quiet-mouse-press-and-hold", "Silent mouse press, hold and release",
  ["device", "launch", "video", "mouse", "pointer", "damped", "hold", "drag", "drop"], 0.557, attack,
  {"bodyHz": 350, "decayMs": 6, "cutoffHz": 2800, "snap": 0.56, "rattle": 0.01},
  [
    {"at": 0, "weight": 1, "pitch": 0.91},
    {"at": 0.49, "weight": 0.55, "pitch": 1.12, "release": true}
  ],
);
