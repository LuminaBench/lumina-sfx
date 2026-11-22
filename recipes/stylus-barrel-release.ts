import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-button.ts';

export default editorContact(
  "stylus-barrel-release", "Stylus barrel button release",
  ["device", "launch", "video", "pen", "tablet", "stylus", "lift", "up"], 0.067, attack,
  {"bodyHz": 1120, "decayMs": 5, "cutoffHz": 7800, "snap": 0.89, "rattle": 0.033},
  [
    {"at": 0, "weight": 0.61, "pitch": 1.16, "release": true}
  ],
);
