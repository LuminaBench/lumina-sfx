import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "silk-title-rise", "Silk title rise",
  ["transition", "whoosh", "launch", "video", "soft", "fabric", "satin", "riser", "typography", "title"],
  {"lowHz": 490, "highHz": 3650, "grainHz": 14, "grainDepth": 0.11, "air": 0.016, "body": 2.55},
  {"duration": 0.72, "apex": 0.82, "direction": 0, "travel": 0, "reverse": false, "echo": 0.08},
);
