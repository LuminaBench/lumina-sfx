#include "GameAudioHelperComponent.h"

#include "Components/AudioComponent.h"
#include "GameFramework/Actor.h"
#include "Kismet/GameplayStatics.h"
#include "Sound/SoundWave.h"

DEFINE_LOG_CATEGORY_STATIC(LogGameAudioHelper, Log, All);

UGameAudioHelperComponent::UGameAudioHelperComponent()
{
	PrimaryComponentTick.bCanEverTick = false;
}

bool UGameAudioHelperComponent::RegisterPool(FName Id, USoundWave* Variant1, USoundWave* Variant2, USoundWave* Variant3)
{
	if (Id.IsNone())
	{
		UE_LOG(LogGameAudioHelper, Warning, TEXT("RegisterPool called with empty Id."));
		return false;
	}

	FGameAudioSoundPool Pool;
	Pool.Variants.Reserve(3);
	USoundWave* Inputs[3] = { Variant1, Variant2, Variant3 };
	for (USoundWave* Wave : Inputs)
	{
		if (IsValid(Wave))
		{
			Pool.Variants.Add(Wave);
		}
	}

	if (Pool.Variants.Num() == 0)
	{
		UE_LOG(LogGameAudioHelper, Warning, TEXT("RegisterPool('%s') failed: no valid USoundWave variants provided."), *Id.ToString());
		return false;
	}

	if (Pool.Variants.Num() < 3)
	{
		UE_LOG(LogGameAudioHelper, Warning, TEXT("RegisterPool('%s') registered %d/3 valid variants."), *Id.ToString(), Pool.Variants.Num());
	}

	Pool.NextIndex = 0;
	SoundPools.Add(Id, MoveTemp(Pool));
	return true;
}

bool UGameAudioHelperComponent::RegisterPoolFromPaths(FName Id, const FString& RelativePath1, const FString& RelativePath2, const FString& RelativePath3)
{
	const FString Paths[3] = { RelativePath1, RelativePath2, RelativePath3 };
	USoundWave* Loaded[3] = { nullptr, nullptr, nullptr };

	for (int32 i = 0; i < 3; ++i)
	{
		const FString ObjectPath = ResolveAssetPath(Paths[i]);
		Loaded[i] = LoadObject<USoundWave>(nullptr, *ObjectPath);
		if (!IsValid(Loaded[i]))
		{
			UE_LOG(LogGameAudioHelper, Warning, TEXT("Failed to load USoundWave at '%s' (from '%s'). Ensure the WAV is imported via Unreal Editor."), *ObjectPath, *Paths[i]);
		}
	}

	return RegisterPool(Id, Loaded[0], Loaded[1], Loaded[2]);
}

bool UGameAudioHelperComponent::RegisterPoolById(FName Id, const FString& RelativeFolder)
{
	if (Id.IsNone())
	{
		return false;
	}

	FString Folder = RelativeFolder;
	Folder.TrimStartAndEndInline();
	Folder.ReplaceInline(TEXT("\\"), TEXT("/"));
	while (Folder.EndsWith(TEXT("/")))
	{
		Folder.LeftChopInline(1);
	}

	const FString IdStr = Id.ToString();
	const FString Base = Folder.IsEmpty() ? IdStr : (Folder + TEXT("/") + IdStr);
	return RegisterPoolFromPaths(
		Id,
		Base + TEXT("-01.wav"),
		Base + TEXT("-02.wav"),
		Base + TEXT("-03.wav")
	);
}

bool UGameAudioHelperComponent::PlayOneShot(FName Id, FVector WorldLocation, float Volume, float PitchJitterOverride)
{
	UWorld* World = GetWorld();
	USoundWave* Wave = GetNextVariant(Id);
	if (!World || !IsValid(Wave) || Wave->bLooping)
	{
		return false;
	}

	const float SafeVolume = FMath::Max(0.0f, Volume);
	const float Pitch = RollPitchVariation(PitchJitterOverride);
	UGameplayStatics::PlaySoundAtLocation(
		World,
		Wave,
		WorldLocation,
		FRotator::ZeroRotator,
		SafeVolume,
		Pitch,
		0.0f,
		GetOrCreateAttenuation()
	);
	return true;
}

bool UGameAudioHelperComponent::StartLoop(FName LoopId, FName PoolId, FVector WorldLocation, float BaseVolume, bool bAttachToOwner, float PitchJitterOverride)
{
	if (LoopId.IsNone())
	{
		return false;
	}

	UWorld* World = GetWorld();
	USoundWave* Wave = GetNextVariant(PoolId);
	if (!World || !IsValid(Wave))
	{
		return false;
	}

	if (!Wave->bLooping)
	{
		return false; // Import loopable WAVs with Looping enabled.
	}
	StopLoop(LoopId, 0.0f);

	const float SafeVolume = FMath::Max(0.0f, BaseVolume);
	const float PitchVariation = RollPitchVariation(PitchJitterOverride);
	USoundAttenuation* Attenuation = GetOrCreateAttenuation();

	UAudioComponent* AudioComp = nullptr;
	AActor* Owner = GetOwner();
	if (bAttachToOwner && IsValid(Owner) && IsValid(Owner->GetRootComponent()))
	{
		AudioComp = UGameplayStatics::SpawnSoundAttached(
			Wave,
			Owner->GetRootComponent(),
			NAME_None,
			FVector::ZeroVector,
			FRotator::ZeroRotator,
			EAttachLocation::KeepRelativeOffset,
			true,
			SafeVolume,
			PitchVariation,
			0.0f,
			Attenuation,
			nullptr,
			true
		);
	}
	else
	{
		AudioComp = UGameplayStatics::SpawnSoundAtLocation(
			World,
			Wave,
			WorldLocation,
			FRotator::ZeroRotator,
			SafeVolume,
			PitchVariation,
			0.0f,
			Attenuation,
			nullptr,
			true
		);
	}

	if (!IsValid(AudioComp))
	{
		return false;
	}

	FActiveLoopState State;
	State.Component = AudioComp;
	State.BaseVolume = SafeVolume;
	State.PitchVariation = PitchVariation;
	ActiveLoops.Add(LoopId, State);
	return true;
}

bool UGameAudioHelperComponent::UpdateLoopRpm(FName LoopId, float NormalizedRpm)
{
	FActiveLoopState* State = ActiveLoops.Find(LoopId);
	if (!State)
	{
		return false;
	}

	UAudioComponent* AudioComp = State->Component.Get();
	if (!IsValid(AudioComp) || !AudioComp->IsPlaying())
	{
		ActiveLoops.Remove(LoopId);
		return false;
	}

	State->RpmNormalized = FMath::Clamp(NormalizedRpm, 0.0f, 1.0f);
	State->bUseRpmModulation = true;
	ApplyLoopParameters(*State);
	return true;
}

bool UGameAudioHelperComponent::UpdateLoopWeather(FName LoopId, float WeatherIntensity)
{
	FActiveLoopState* State = ActiveLoops.Find(LoopId);
	if (!State)
	{
		return false;
	}

	UAudioComponent* AudioComp = State->Component.Get();
	if (!IsValid(AudioComp) || !AudioComp->IsPlaying())
	{
		ActiveLoops.Remove(LoopId);
		return false;
	}

	State->WeatherIntensity = FMath::Clamp(WeatherIntensity, 0.0f, 1.0f);
	State->bUseWeatherModulation = true;
	ApplyLoopParameters(*State);
	return true;
}

bool UGameAudioHelperComponent::UpdateLoopLocation(FName LoopId, FVector WorldLocation)
{
	FActiveLoopState* State = ActiveLoops.Find(LoopId);
	if (!State)
	{
		return false;
	}

	UAudioComponent* AudioComp = State->Component.Get();
	if (!IsValid(AudioComp) || !AudioComp->IsPlaying())
	{
		ActiveLoops.Remove(LoopId);
		return false;
	}

	AudioComp->SetWorldLocation(WorldLocation);
	return true;
}

bool UGameAudioHelperComponent::StopLoop(FName LoopId, float FadeOutDuration)
{
	FActiveLoopState State;
	if (!ActiveLoops.RemoveAndCopyValue(LoopId, State))
	{
		return false;
	}

	if (UAudioComponent* AudioComp = State.Component.Get())
	{
		if (IsValid(AudioComp))
		{
			if (FadeOutDuration > 0.0f)
			{
				AudioComp->FadeOut(FadeOutDuration, 0.0f);
			}
			else
			{
				AudioComp->Stop();
			}
		}
	}

	return true;
}

void UGameAudioHelperComponent::StopAllLoops(float FadeOutDuration)
{
	for (const TPair<FName, FActiveLoopState>& Pair : ActiveLoops)
	{
		if (UAudioComponent* AudioComp = Pair.Value.Component.Get())
		{
			if (IsValid(AudioComp))
			{
				if (FadeOutDuration > 0.0f)
				{
					AudioComp->FadeOut(FadeOutDuration, 0.0f);
				}
				else
				{
					AudioComp->Stop();
				}
			}
		}
	}

	ActiveLoops.Empty();
}

bool UGameAudioHelperComponent::IsLoopPlaying(FName LoopId) const
{
	const FActiveLoopState* State = ActiveLoops.Find(LoopId);
	if (!State)
	{
		return false;
	}

	const UAudioComponent* AudioComp = State->Component.Get();
	return IsValid(AudioComp) && AudioComp->IsPlaying();
}

void UGameAudioHelperComponent::EndPlay(const EEndPlayReason::Type EndPlayReason)
{
	StopAllLoops(0.0f);
	Super::EndPlay(EndPlayReason);
}

USoundWave* UGameAudioHelperComponent::GetNextVariant(FName Id)
{
	FGameAudioSoundPool* Pool = SoundPools.Find(Id);
	if (!Pool || Pool->Variants.Num() == 0)
	{
		UE_LOG(LogGameAudioHelper, Warning, TEXT("No sound pool registered for Id '%s'."), *Id.ToString());
		return nullptr;
	}

	const int32 Count = Pool->Variants.Num();
	for (int32 Offset = 0; Offset < Count; ++Offset)
	{
		const int32 Index = (Pool->NextIndex + Offset) % Count;
		USoundWave* Candidate = Pool->Variants[Index].Get();
		if (IsValid(Candidate))
		{
			Pool->NextIndex = (Index + 1) % Count;
			return Candidate;
		}
	}

	return nullptr;
}

float UGameAudioHelperComponent::RollPitchVariation(float PitchJitterOverride) const
{
	const float Jitter = FMath::Clamp(PitchJitterOverride >= 0.0f ? PitchJitterOverride : DefaultPitchJitter, 0.0f, 0.5f);
	return 1.0f + FMath::FRandRange(-Jitter, Jitter);
}

USoundAttenuation* UGameAudioHelperComponent::GetOrCreateAttenuation()
{
	if (IsValid(CustomAttenuation))
	{
		return CustomAttenuation;
	}

	if (!IsValid(RuntimeAttenuation))
	{
		RuntimeAttenuation = NewObject<USoundAttenuation>(this);
	}

	FSoundAttenuationSettings& Settings = RuntimeAttenuation->Attenuation;
	Settings.bAttenuate = true;
	Settings.bSpatialize = bSpatialize;
	Settings.SpatializationAlgorithm = ESoundSpatializationAlgorithm::SPATIALIZATION_Default;
	Settings.DistanceAlgorithm = DistanceModel;
	Settings.AttenuationShape = EAttenuationShape::Sphere;
	Settings.AttenuationShapeExtents = FVector(FMath::Max(0.0f, InnerRadius), 0.0f, 0.0f);
	Settings.FalloffDistance = FMath::Max(1.0f, FalloffDistance);
	return RuntimeAttenuation;
}

void UGameAudioHelperComponent::ApplyLoopParameters(const FActiveLoopState& State) const
{
	UAudioComponent* AudioComp = State.Component.Get();
	if (!IsValid(AudioComp))
	{
		return;
	}

	// Always start from the stored per-play PitchVariation so live updates preserve it.
	float Pitch = State.PitchVariation;
	float Volume = State.BaseVolume;

	if (State.bUseRpmModulation)
	{
		Pitch *= FMath::Lerp(RpmMinPitch, RpmMaxPitch, State.RpmNormalized);
		Volume *= FMath::Lerp(RpmMinVolume, RpmMaxVolume, State.RpmNormalized);
	}

	if (State.bUseWeatherModulation)
	{
		Pitch *= FMath::Lerp(WeatherMinPitch, WeatherMaxPitch, State.WeatherIntensity);
		Volume *= FMath::Lerp(WeatherMinVolume, WeatherMaxVolume, State.WeatherIntensity);

		const float CutoffHz = FMath::Lerp(WeatherMinLowPassHz, WeatherMaxLowPassHz, State.WeatherIntensity);
		AudioComp->SetLowPassFilterEnabled(true);
		AudioComp->SetLowPassFilterFrequency(FMath::Clamp(CutoffHz, 20.0f, 20000.0f));
	}

	AudioComp->SetPitchMultiplier(FMath::Clamp(Pitch, 0.1f, 4.0f));
	AudioComp->SetVolumeMultiplier(FMath::Max(0.0f, Volume));
}

FString UGameAudioHelperComponent::ResolveAssetPath(const FString& RelativePath)
{
	FString CleanPath = RelativePath;
	CleanPath.TrimStartAndEndInline();
	CleanPath.ReplaceInline(TEXT("\\"), TEXT("/"));

	if (CleanPath.EndsWith(TEXT(".wav"), ESearchCase::IgnoreCase))
	{
		CleanPath.LeftChopInline(4);
	}

	if (!CleanPath.StartsWith(TEXT("/Game/"), ESearchCase::IgnoreCase))
	{
		while (CleanPath.StartsWith(TEXT("/")))
		{
			CleanPath.RightChopInline(1);
		}
		if (CleanPath.StartsWith(TEXT("Content/"), ESearchCase::IgnoreCase))
		{
			CleanPath.RightChopInline(8);
		}
		CleanPath = TEXT("/Game/") + CleanPath;
	}

	int32 LastSlashIndex = INDEX_NONE;
	if (CleanPath.FindLastChar(TEXT('/'), LastSlashIndex))
	{
		const FString AssetSegment = CleanPath.Mid(LastSlashIndex + 1);
		if (!AssetSegment.IsEmpty() && !AssetSegment.Contains(TEXT(".")))
		{
			CleanPath += TEXT(".") + AssetSegment;
		}
	}

	return CleanPath;
}
