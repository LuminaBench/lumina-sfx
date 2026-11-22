import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "celluloid-pull-away", "Celluloid pull away",
  ["transition", "whoosh", "launch", "video", "film", "strip", "flutter", "zoom", "out", "retreat"],
  {"lowHz": 950, "highHz": 5070, "grainHz": 47, "grainDepth": 0.83, "air": 0.05, "body": 1.55},
  {"duration": 0.48, "apex": 0.12, "direction": 0, "travel": 0, "reverse": true, "echo": 0.12},
);
