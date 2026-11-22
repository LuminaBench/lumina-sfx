import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-button.ts';

export default editorContact(
  "presentation-remote-double-click", "Presentation remote double click",
  ["device", "launch", "video", "slides", "remote", "presenter", "double", "selection"], 0.301, attack,
  {"bodyHz": 470, "decayMs": 11, "cutoffHz": 3600, "snap": 0.85, "rattle": 0.018},
  [
    {"at": 0, "weight": 1, "pitch": 1},
    {"at": 0.064, "weight": 0.27, "pitch": 1.1, "release": true},
    {"at": 0.158, "weight": 0.86, "pitch": 1.04},
    {"at": 0.223, "weight": 0.25, "pitch": 1.09, "release": true}
  ],
);
