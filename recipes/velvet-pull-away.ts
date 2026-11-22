import friction from './_recordings/isolated-cloth-pass.ts';
import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "velvet-pull-away", "Velvet pull away",
  ["transition", "whoosh", "launch", "video", "muted", "felt", "cloth", "zoom", "out", "retreat"],
  {"lowHz": 280, "highHz": 1800, "grainHz": 20, "grainDepth": 0.19, "air": 0.008, "body": 4.2},
  {"duration": 0.48, "apex": 0.12, "direction": 0, "travel": 0, "reverse": true, "echo": 0.12},
  friction,
);
