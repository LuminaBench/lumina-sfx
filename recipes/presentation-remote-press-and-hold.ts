import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-button.ts';

export default editorContact(
  "presentation-remote-press-and-hold", "Presentation remote press, hold and release",
  ["device", "launch", "video", "slides", "remote", "presenter", "hold", "drag", "drop"], 0.568, attack,
  {"bodyHz": 470, "decayMs": 11, "cutoffHz": 3600, "snap": 0.85, "rattle": 0.018},
  [
    {"at": 0, "weight": 1, "pitch": 0.91},
    {"at": 0.49, "weight": 0.55, "pitch": 1.12, "release": true}
  ],
);
