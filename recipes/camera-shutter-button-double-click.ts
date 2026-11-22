import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-microclick.ts';

export default editorContact(
  "camera-shutter-button-double-click", "Camera shutter button double click",
  ["device", "launch", "video", "camera", "focus", "detent", "double", "selection"], 0.29, attack,
  {"bodyHz": 680, "decayMs": 7, "cutoffHz": 7500, "snap": 1.03, "rattle": 0.032},
  [
    {"at": 0, "weight": 1, "pitch": 1},
    {"at": 0.064, "weight": 0.27, "pitch": 1.1, "release": true},
    {"at": 0.158, "weight": 0.86, "pitch": 1.04},
    {"at": 0.223, "weight": 0.25, "pitch": 1.09, "release": true}
  ],
);
