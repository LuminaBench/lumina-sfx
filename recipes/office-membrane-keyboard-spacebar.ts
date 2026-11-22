import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "office-membrane-keyboard-spacebar", "Office membrane keyboard spacebar tap",
  ["keyboard", "key", "launch", "video", "normal", "desktop", "rubber", "dome", "space", "bar", "stabilizer"], 0.152, attack,
  {"bodyHz": 325, "decayMs": 8, "cutoffHz": 3100, "snap": 0.7, "rattle": 0.01},
  [
    {"at": 0, "weight": 1, "pitch": 0.6},
    {"at": 0.007, "weight": 0.2, "pitch": 1.36},
    {"at": 0.085, "weight": 0.38, "pitch": 0.74, "release": true}
  ],
);
