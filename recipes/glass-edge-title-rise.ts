import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "glass-edge-title-rise", "Glass edge title rise",
  ["transition", "whoosh", "launch", "video", "glass", "bright", "clean", "riser", "typography", "title"],
  {"lowHz": 1580, "highHz": 6600, "grainHz": 240, "grainDepth": 0.11, "air": 0.024, "body": 1.23},
  {"duration": 0.72, "apex": 0.82, "direction": 0, "travel": 0, "reverse": false, "echo": 0.08},
);
