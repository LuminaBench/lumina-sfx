import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "celluloid-whip-cut", "Celluloid whip cut",
  ["transition", "whoosh", "launch", "video", "film", "strip", "flutter", "fast", "cut", "whip", "pan"],
  {"lowHz": 950, "highHz": 5070, "grainHz": 47, "grainDepth": 0.83, "air": 0.05, "body": 1.55},
  {"duration": 0.12, "apex": 0.16, "direction": 1, "travel": 0.9, "reverse": true, "echo": 0},
);
