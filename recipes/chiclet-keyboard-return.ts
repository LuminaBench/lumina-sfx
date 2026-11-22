import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "chiclet-keyboard-return", "Compact chiclet keyboard Return key",
  ["keyboard", "key", "launch", "video", "normal", "slim", "low-profile", "enter", "submit"], 0.14, attack,
  {"bodyHz": 860, "decayMs": 6, "cutoffHz": 5400, "snap": 1.12, "rattle": 0.012},
  [
    {"at": 0, "weight": 1, "pitch": 0.78},
    {"at": 0.073, "weight": 0.34, "pitch": 0.94, "release": true}
  ],
);
