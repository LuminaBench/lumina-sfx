import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-button.ts';

export default editorContact(
  "presentation-remote-press", "Presentation remote single press",
  ["device", "launch", "video", "slides", "remote", "presenter", "single", "click", "down"], 0.078, attack,
  {"bodyHz": 470, "decayMs": 11, "cutoffHz": 3600, "snap": 0.85, "rattle": 0.018},
  [
    {"at": 0, "weight": 1, "pitch": 1}
  ],
);
