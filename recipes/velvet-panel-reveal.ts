import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "velvet-panel-reveal", "Velvet panel reveal",
  ["transition", "whoosh", "launch", "video", "muted", "felt", "cloth", "reveal", "panel", "entrance"],
  {"lowHz": 280, "highHz": 1800, "grainHz": 20, "grainDepth": 0.19, "air": 0.008, "body": 4.2},
  {"duration": 0.38, "apex": 0.48, "direction": 0, "travel": 0, "reverse": false, "echo": 0.04},
);
