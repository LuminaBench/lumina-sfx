import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "tactile-mechanical-keyboard-return", "Tactile mechanical keyboard Return key",
  ["keyboard", "key", "launch", "video", "mechanical", "bump", "enter", "submit"], 0.145, attack,
  {"bodyHz": 530, "decayMs": 10, "cutoffHz": 7500, "snap": 1.25, "rattle": 0.04},
  [
    {"at": 0, "weight": 1, "pitch": 0.78},
    {"at": 0.073, "weight": 0.34, "pitch": 0.94, "release": true}
  ],
);
