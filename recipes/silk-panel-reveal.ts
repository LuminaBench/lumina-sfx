import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "silk-panel-reveal", "Silk panel reveal",
  ["transition", "whoosh", "launch", "video", "soft", "fabric", "satin", "reveal", "panel", "entrance"],
  {"lowHz": 490, "highHz": 3650, "grainHz": 14, "grainDepth": 0.11, "air": 0.016, "body": 2.55},
  {"duration": 0.38, "apex": 0.48, "direction": 0, "travel": 0, "reverse": false, "echo": 0.04},
);
