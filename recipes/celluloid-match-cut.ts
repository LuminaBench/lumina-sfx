import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "celluloid-match-cut", "Celluloid match cut",
  ["transition", "whoosh", "launch", "video", "film", "strip", "flutter", "short", "edit", "focus", "cut"],
  {"lowHz": 950, "highHz": 5070, "grainHz": 47, "grainDepth": 0.83, "air": 0.05, "body": 1.55},
  {"duration": 0.095, "apex": 0.31, "direction": 0, "travel": 0, "reverse": true, "echo": 0},
);
