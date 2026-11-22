import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-key-firm.ts';

export default editorContact(
  "tactile-mechanical-keyboard-key-down", "Tactile mechanical keyboard letter key down",
  ["keyboard", "key", "launch", "video", "mechanical", "bump", "single", "tap", "press"], 0.072, attack,
  {"bodyHz": 530, "decayMs": 10, "cutoffHz": 7500, "snap": 1.25, "rattle": 0.04},
  [
    {"at": 0, "weight": 1, "pitch": 1}
  ],
);
