# Web Audio and Three.js

The web installer writes WAVs and this ES module under `public/lumina-sfx/`. Call `unlock()` from the first user gesture. Register only the sounds used in the scene.

```js
import { WebGameAudio } from '/lumina-sfx/audio-helper.js';

const bank = new WebGameAudio({ assetRoot: '/lumina-sfx' });
await bank.unlock();
await Promise.all(['plant-large-seeds', 'light-rain-loop'].map(id => bank.registerPool(id)));

bank.play('plant-large-seeds', { position: [1, 0, 2] });
const rain = bank.playLoop('light-rain-loop', { position: [0, 2, 4] });
rain.setWeather(0.65);
rain.stop();
```

Call `bank.syncListener(camera)` when a Three.js camera moves. A plain Web Audio game can use `bank.setListener(position, forward, up)`. Handles accept `setPosition()`; a vehicle loop can call `setRpm(2600)`. Each pool cycles decoded WAVs in order and applies small pitch variations. Dispose the bank when leaving the scene.
