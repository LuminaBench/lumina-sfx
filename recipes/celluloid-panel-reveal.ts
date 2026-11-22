import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "celluloid-panel-reveal", "Celluloid panel reveal",
  ["transition", "whoosh", "launch", "video", "film", "strip", "flutter", "reveal", "panel", "entrance"],
  {"lowHz": 950, "highHz": 5070, "grainHz": 47, "grainDepth": 0.83, "air": 0.05, "body": 1.55},
  {"duration": 0.38, "apex": 0.48, "direction": 0, "travel": 0, "reverse": false, "echo": 0.04},
);
