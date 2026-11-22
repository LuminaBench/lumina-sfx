import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-key-office.ts';

export default editorContact(
  "chiclet-keyboard-key-up", "Compact chiclet keyboard letter key release",
  ["keyboard", "key", "launch", "video", "normal", "slim", "low-profile", "single", "lift", "release"], 0.067, attack,
  {"bodyHz": 860, "decayMs": 6, "cutoffHz": 5400, "snap": 1.12, "rattle": 0.012},
  [
    {"at": 0, "weight": 0.63, "pitch": 1.14, "release": true}
  ],
);
