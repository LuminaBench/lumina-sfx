import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "tracing-paper-panel-reveal", "Tracing paper panel reveal",
  ["transition", "whoosh", "launch", "video", "paper", "dry", "thin", "reveal", "panel", "entrance"],
  {"lowHz": 1450, "highHz": 6400, "grainHz": 132, "grainDepth": 0.63, "air": 0.075, "body": 0.98},
  {"duration": 0.38, "apex": 0.48, "direction": 0, "travel": 0, "reverse": false, "echo": 0.04},
);
