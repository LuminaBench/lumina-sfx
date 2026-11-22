import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-button.ts';

export default editorContact(
  "stylus-barrel-press-and-hold", "Stylus barrel button press, hold and release",
  ["device", "launch", "video", "pen", "tablet", "stylus", "hold", "drag", "drop"], 0.557, attack,
  {"bodyHz": 1120, "decayMs": 5, "cutoffHz": 7800, "snap": 0.89, "rattle": 0.033},
  [
    {"at": 0, "weight": 1, "pitch": 0.91},
    {"at": 0.49, "weight": 0.55, "pitch": 1.12, "release": true}
  ],
);
