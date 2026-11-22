# Pygame playback

Install Pygame in the game's environment. With this folder on your Python path, start the mixer and play the installed IDs.

```python
from pathlib import Path
from lumina_audio import SoundBank

bank = SoundBank(Path(__file__).resolve().parent)
wind = bank.play("howling-wind-loop", position=(1, 0, 3), loop=True)
bank.play("plant-large-seeds")
if wind is not None:
    bank.update_loop(wind, rpm=0.4, weather=0.65)
    bank.stop(wind)
```

Use a signed 16-bit stereo mixer. Positions use world units, with positive X to the listener's right. Set `bank.listener` as the camera moves. Distance controls attenuation, and the X offset controls stereo pan. The mixer cycles recorded variations and resamples them for pitch. Pygame restarts the loop with a short fade when the pitch bin changes. Weather-only gain changes preserve its position.
