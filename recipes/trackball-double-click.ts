import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-button.ts';

export default editorContact(
  "trackball-double-click", "Trackball button double click",
  ["device", "launch", "video", "mouse", "trackball", "desktop", "double", "selection"], 0.295, attack,
  {"bodyHz": 570, "decayMs": 10, "cutoffHz": 5700, "snap": 1.15, "rattle": 0.03},
  [
    {"at": 0, "weight": 1, "pitch": 1},
    {"at": 0.064, "weight": 0.27, "pitch": 1.1, "release": true},
    {"at": 0.158, "weight": 0.86, "pitch": 1.04},
    {"at": 0.223, "weight": 0.25, "pitch": 1.09, "release": true}
  ],
);
