import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-linear-key-travel.ts';

export default editorContact(
  "linear-mechanical-keyboard-key-up", "Linear mechanical keyboard letter key release",
  ["keyboard", "key", "launch", "video", "mechanical", "smooth", "single", "lift", "release"], 0.084, attack,
  { captured: true, pairedTakes: true, cutoffHz: 11500 },
  [
    {"at": 0, "weight": 0.63, "pitch": 1.14, "release": true}
  ],
);
