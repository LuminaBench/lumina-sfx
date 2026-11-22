import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-key-firm.ts';

export default editorContact(
  "gasket-mount-keyboard-key-up", "Gasket-mounted keyboard letter key release",
  ["keyboard", "key", "launch", "video", "mechanical", "soft", "thock", "single", "lift", "release"], 0.12, attack,
  {"bodyHz": 240, "decayMs": 18, "cutoffHz": 4600, "snap": 0.86, "rattle": 0.018},
  [
    {"at": 0, "weight": 0.63, "pitch": 1.14, "release": true}
  ],
);
