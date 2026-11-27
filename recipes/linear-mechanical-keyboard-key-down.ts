import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-linear-key-travel.ts';

export default editorContact(
  "linear-mechanical-keyboard-key-down", "Linear mechanical keyboard letter key down",
  ["keyboard", "key", "launch", "video", "mechanical", "smooth", "single", "tap", "press"], 0.084, attack,
  { captured: true, pairedTakes: true, cutoffHz: 11500 },
  [
    {"at": 0, "weight": 1, "pitch": 1}
  ],
);
