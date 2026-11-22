# Unity

The installer writes WAV variants to `Assets/Resources/LuminaSfx/audio/`. Attach `GameAudioHelper` to a GameObject and keep one AudioListener active. Call these methods from a scene component with its `audioBank` field assigned in the Inspector.

```csharp
[SerializeField] GameAudioHelper audioBank;
int rain;

void Start() {
    audioBank.RegisterPoolFromResources("plant-large-seeds");
    audioBank.RegisterPoolFromResources("light-rain-loop");
    rain = audioBank.StartLoop("light-rain-loop", transform.position);
}
void Planted() => audioBank.PlayOneShot3D("plant-large-seeds", transform.position);
void RainChanged(float amount) => audioBank.UpdateLoopWeather(rain, amount);
void OnDisable() => audioBank.StopLoop(rain, 0.05f);
```

Each trigger selects the next clip and varies pitch. Positions and distance rolloff use Unity world units. For vehicles call `UpdateLoopRpm(handle, normalizedRpm)` on a running engine loop. You can also register AudioClip references directly with `RegisterPool`.
