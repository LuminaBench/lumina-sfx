import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "celluloid-swipe-right", "Celluloid rightward swipe",
  ["transition", "whoosh", "launch", "video", "film", "strip", "flutter", "swipe", "right", "slide"],
  {"lowHz": 950, "highHz": 5070, "grainHz": 47, "grainDepth": 0.83, "air": 0.05, "body": 1.55},
  {"duration": 0.19, "apex": 0.3, "direction": 1, "travel": 0.84, "reverse": false, "echo": 0},
);
