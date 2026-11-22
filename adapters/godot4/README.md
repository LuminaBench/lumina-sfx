# Godot 4

The installer puts the helper and imported WAV sources under `res://lumina_sfx/`. Give the scene a current Camera3D or AudioListener3D.

```gdscript
var audio := GameAudioHelper.new()
var rain_handle: int

func _ready() -> void:
    add_child(audio)
    for id in ["plant-large-seeds", "light-rain-loop"]:
        var paths := PackedStringArray()
        for index in range(1, 4):
            paths.append("res://lumina_sfx/audio/%s-%02d.wav" % [id, index])
        audio.register_pool(id, paths)
    rain_handle = audio.start_loop(&"light-rain-loop", Vector3(2, 0, 4))

func planted(position: Vector3) -> void:
    audio.play_one_shot(&"plant-large-seeds", position)

func rain_changed(amount: float) -> void:
    audio.update_weather(rain_handle, amount, Vector3(2, 0, 4))
```

Register an engine loop the same way and call `update_rpm(handle, normalized_rpm, world_position)`. Release a running loop with `stop_loop(handle)`. The helper cycles WAV takes, varies pitch at onset and uses AudioStreamPlayer3D attenuation.
