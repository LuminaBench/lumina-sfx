import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "office-membrane-keyboard-return", "Office membrane keyboard Return key",
  ["keyboard", "key", "launch", "video", "normal", "desktop", "rubber", "dome", "enter", "submit"], 0.14, attack,
  {"bodyHz": 325, "decayMs": 8, "cutoffHz": 3100, "snap": 0.7, "rattle": 0.01},
  [
    {"at": 0, "weight": 1, "pitch": 0.78},
    {"at": 0.073, "weight": 0.34, "pitch": 0.94, "release": true}
  ],
);
