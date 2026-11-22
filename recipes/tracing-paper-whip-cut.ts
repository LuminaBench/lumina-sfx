import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "tracing-paper-whip-cut", "Tracing paper whip cut",
  ["transition", "whoosh", "launch", "video", "paper", "dry", "thin", "fast", "cut", "whip", "pan"],
  {"lowHz": 1450, "highHz": 6400, "grainHz": 132, "grainDepth": 0.63, "air": 0.075, "body": 0.98},
  {"duration": 0.12, "apex": 0.16, "direction": 1, "travel": 0.9, "reverse": true, "echo": 0},
);
