import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "linear-mechanical-keyboard-return", "Linear mechanical keyboard Return key",
  ["keyboard", "key", "launch", "video", "mechanical", "smooth", "enter", "submit"], 0.157, attack,
  {"bodyHz": 390, "decayMs": 12, "cutoffHz": 6200, "snap": 1.0, "rattle": 0.025},
  [
    {"at": 0, "weight": 1, "pitch": 0.78},
    {"at": 0.073, "weight": 0.34, "pitch": 0.94, "release": true}
  ],
);
