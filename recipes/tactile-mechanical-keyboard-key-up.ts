import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-key-firm.ts';

export default editorContact(
  "tactile-mechanical-keyboard-key-up", "Tactile mechanical keyboard letter key release",
  ["keyboard", "key", "launch", "video", "mechanical", "bump", "single", "lift", "release"], 0.072, attack,
  {"bodyHz": 530, "decayMs": 10, "cutoffHz": 7500, "snap": 1.25, "rattle": 0.04},
  [
    {"at": 0, "weight": 0.63, "pitch": 1.14, "release": true}
  ],
);
