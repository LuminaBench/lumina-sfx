import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-button.ts';

export default editorContact(
  "stylus-barrel-double-click", "Stylus barrel button double click",
  ["device", "launch", "video", "pen", "tablet", "stylus", "double", "selection"], 0.29, attack,
  {"bodyHz": 1120, "decayMs": 5, "cutoffHz": 7800, "snap": 0.89, "rattle": 0.033},
  [
    {"at": 0, "weight": 1, "pitch": 1},
    {"at": 0.064, "weight": 0.27, "pitch": 1.1, "release": true},
    {"at": 0.158, "weight": 0.86, "pitch": 1.04},
    {"at": 0.223, "weight": 0.25, "pitch": 1.09, "release": true}
  ],
);
