import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-key-firm.ts';

export default editorContact(
  "linear-mechanical-keyboard-key-up", "Linear mechanical keyboard letter key release",
  ["keyboard", "key", "launch", "video", "mechanical", "smooth", "single", "lift", "release"], 0.084, attack,
  {"bodyHz": 390, "decayMs": 12, "cutoffHz": 6200, "snap": 1.0, "rattle": 0.025},
  [
    {"at": 0, "weight": 0.63, "pitch": 1.14, "release": true}
  ],
);
