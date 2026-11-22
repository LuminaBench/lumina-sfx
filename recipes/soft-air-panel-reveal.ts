import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "soft-air-panel-reveal", "Soft air panel reveal",
  ["transition", "whoosh", "launch", "video", "quiet", "airy", "diffuse", "reveal", "panel", "entrance"],
  {"lowHz": 395, "highHz": 2170, "grainHz": 4, "grainDepth": 0.08, "air": 0.036, "body": 3.55},
  {"duration": 0.38, "apex": 0.48, "direction": 0, "travel": 0, "reverse": false, "echo": 0.04},
);
