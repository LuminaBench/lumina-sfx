import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-microclick.ts';

export default editorContact(
  "quiet-mouse-double-click", "Silent mouse double click",
  ["device", "launch", "video", "mouse", "pointer", "damped", "double", "selection"], 0.29, attack,
  {"bodyHz": 350, "decayMs": 6, "cutoffHz": 2800, "snap": 0.56, "rattle": 0.01},
  [
    {"at": 0, "weight": 1, "pitch": 1},
    {"at": 0.064, "weight": 0.27, "pitch": 1.1, "release": true},
    {"at": 0.158, "weight": 0.86, "pitch": 1.04},
    {"at": 0.223, "weight": 0.25, "pitch": 1.09, "release": true}
  ],
);
