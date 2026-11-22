import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "tracing-paper-page-wipe", "Tracing paper page wipe",
  ["transition", "whoosh", "launch", "video", "paper", "dry", "thin", "wipe", "page", "unfold"],
  {"lowHz": 1450, "highHz": 6400, "grainHz": 132, "grainDepth": 0.63, "air": 0.075, "body": 0.98},
  {"duration": 0.42, "apex": 0.59, "direction": -1, "travel": 0.55, "reverse": true, "echo": 0.045},
);
