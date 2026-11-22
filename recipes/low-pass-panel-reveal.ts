import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "low-pass-panel-reveal", "Low pass panel reveal",
  ["transition", "whoosh", "launch", "video", "bass", "deep", "body", "reveal", "panel", "entrance"],
  {"lowHz": 170, "highHz": 1080, "grainHz": 8, "grainDepth": 0.17, "air": 0.006, "body": 5.0},
  {"duration": 0.38, "apex": 0.48, "direction": 0, "travel": 0, "reverse": false, "echo": 0.04},
);
