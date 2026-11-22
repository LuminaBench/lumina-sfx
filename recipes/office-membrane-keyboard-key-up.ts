import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-key-office.ts';

export default editorContact(
  "office-membrane-keyboard-key-up", "Office membrane keyboard letter key release",
  ["keyboard", "key", "launch", "video", "normal", "desktop", "rubber", "dome", "single", "lift", "release"], 0.067, attack,
  {"bodyHz": 325, "decayMs": 8, "cutoffHz": 3100, "snap": 0.7, "rattle": 0.01},
  [
    {"at": 0, "weight": 0.63, "pitch": 1.14, "release": true}
  ],
);
