import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-microclick.ts';

export default editorContact(
  "desktop-mouse-double-click", "Desktop mouse double click",
  ["device", "launch", "video", "mouse", "pointer", "microswitch", "double", "selection"], 0.29, attack,
  {"bodyHz": 790, "decayMs": 6, "cutoffHz": 8400, "snap": 1.3, "rattle": 0.031},
  [
    {"at": 0, "weight": 1, "pitch": 1},
    {"at": 0.064, "weight": 0.27, "pitch": 1.1, "release": true},
    {"at": 0.158, "weight": 0.86, "pitch": 1.04},
    {"at": 0.223, "weight": 0.25, "pitch": 1.09, "release": true}
  ],
);
