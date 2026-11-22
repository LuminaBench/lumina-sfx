import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "brushed-metal-title-rise", "Brushed metal title rise",
  ["transition", "whoosh", "launch", "video", "metal", "foil", "brushed", "riser", "typography", "title"],
  {"lowHz": 1320, "highHz": 8380, "grainHz": 181, "grainDepth": 0.37, "air": 0.058, "body": 1.9},
  {"duration": 0.72, "apex": 0.82, "direction": 0, "travel": 0, "reverse": false, "echo": 0.08},
);
