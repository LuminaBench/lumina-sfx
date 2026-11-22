import friction from './_recordings/isolated-cloth-pass.ts';
import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "linen-panel-reveal", "Linen panel reveal",
  ["transition", "whoosh", "launch", "video", "textile", "woven", "dry", "reveal", "panel", "entrance"],
  {"lowHz": 740, "highHz": 4460, "grainHz": 88, "grainDepth": 0.58, "air": 0.025, "body": 2.35},
  {"duration": 0.38, "apex": 0.48, "direction": 0, "travel": 0, "reverse": false, "echo": 0.04},
  friction,
);
