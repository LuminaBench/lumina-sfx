import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "silent-linear-keyboard-return", "Damped linear keyboard Return key",
  ["keyboard", "key", "launch", "video", "mechanical", "quiet", "rubber", "enter", "submit"], 0.14, attack,
  {"bodyHz": 275, "decayMs": 7, "cutoffHz": 2850, "snap": 0.65, "rattle": 0.008},
  [
    {"at": 0, "weight": 1, "pitch": 0.78},
    {"at": 0.073, "weight": 0.34, "pitch": 0.94, "release": true}
  ],
);
