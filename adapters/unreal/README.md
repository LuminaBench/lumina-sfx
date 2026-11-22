# Unreal Engine 5

The installer places the runtime module in `Plugins/LuminaSfx` and source WAVs in `Content/LuminaSfx/audio`. Build the editor target to load the component. Import the WAVs as Sound Waves, enable **Looping** on weather and engine beds, and add a **Game Audio Helper Component** to the actor. For a packaged game, reference the imported Sound Waves in the component's pool or include their folder in the cooking settings.

In Blueprint use **Register Pool** with three imported Sound Waves, then **Play One Shot** with the ID and world location. **Start Loop** takes a loop handle name, pool ID and location. **Update Loop RPM** and **Update Loop Weather** take a normalized 0–1 value. **Stop Loop** accepts a fade time. The component cycles takes and applies UE spatial attenuation and pitch variation.

Native callers can add `LuminaSfx` to their module dependencies, include `GameAudioHelperComponent.h`, and call the same component API. With imported names matching the export filenames:

```cpp
Audio->RegisterPoolById(TEXT("plant-large-seeds"));
Audio->PlayOneShot(TEXT("plant-large-seeds"), GetActorLocation());
Audio->RegisterPoolById(TEXT("light-rain-loop"));
Audio->StartLoop(TEXT("Rain"), TEXT("light-rain-loop"), GetActorLocation());
Audio->UpdateLoopWeather(TEXT("Rain"), 0.65f);
Audio->StopLoop(TEXT("Rain"), 0.15f);
```

With an explicit staging `--dest`, move its `Plugins/LuminaSfx` folder to the game and import its `audio/` folder under `/Game/LuminaSfx/`.
