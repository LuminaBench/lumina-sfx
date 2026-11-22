import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-button.ts';

export default editorContact(
  "presentation-remote-three-taps", "Presentation remote three deliberate taps",
  ["device", "launch", "video", "slides", "remote", "presenter", "triple", "repeat"], 0.401, attack,
  {"bodyHz": 470, "decayMs": 11, "cutoffHz": 3600, "snap": 0.85, "rattle": 0.018},
  [
    {"at": 0, "weight": 0.8, "pitch": 1.03},
    {"at": 0.137, "weight": 1, "pitch": 0.96},
    {"at": 0.323, "weight": 0.89, "pitch": 1.06}
  ],
);
