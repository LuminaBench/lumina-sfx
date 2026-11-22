import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "celluloid-page-wipe", "Celluloid page wipe",
  ["transition", "whoosh", "launch", "video", "film", "strip", "flutter", "wipe", "page", "unfold"],
  {"lowHz": 950, "highHz": 5070, "grainHz": 47, "grainDepth": 0.83, "air": 0.05, "body": 1.55},
  {"duration": 0.42, "apex": 0.59, "direction": -1, "travel": 0.55, "reverse": true, "echo": 0.045},
);
