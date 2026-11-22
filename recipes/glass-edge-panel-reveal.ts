import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "glass-edge-panel-reveal", "Glass edge panel reveal",
  ["transition", "whoosh", "launch", "video", "glass", "bright", "clean", "reveal", "panel", "entrance"],
  {"lowHz": 2250, "highHz": 9250, "grainHz": 240, "grainDepth": 0.11, "air": 0.024, "body": 1.23},
  {"duration": 0.38, "apex": 0.48, "direction": 0, "travel": 0, "reverse": false, "echo": 0.04},
);
