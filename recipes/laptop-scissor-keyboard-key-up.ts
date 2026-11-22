import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-key-office.ts';

export default editorContact(
  "laptop-scissor-keyboard-key-up", "Laptop scissor keyboard letter key release",
  ["keyboard", "key", "launch", "video", "normal", "notebook", "low-profile", "single", "lift", "release"], 0.067, attack,
  {"bodyHz": 1050, "decayMs": 5, "cutoffHz": 6700, "snap": 1.25, "rattle": 0.016},
  [
    {"at": 0, "weight": 0.63, "pitch": 1.14, "release": true}
  ],
);
