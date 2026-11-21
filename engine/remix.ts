import { renderChannels } from './render.ts';
import { renderDurationSec, resolveMacros } from './sculpt.ts';
import type {
  DesignMacros,
  RenderContext,
  ResolvedOptions,
  SoundParameter,
  SoundRecipe,
  SpectralExpectation,
} from './types.ts';

export interface RemixLayer {
  recipe: SoundRecipe;
  macros?: Readonly<DesignMacros>;
  gain?: number;
  offsetSec?: number;
  params?: Readonly<Record<string, number>>;
}
export interface RemixDesign {
  id: string;
  name?: string;
  spectrum?: readonly SpectralExpectation[];
  macros?: Readonly<DesignMacros>;
}

export function composeRecipe(design: RemixDesign, layers: readonly RemixLayer[]): SoundRecipe {
  if (typeof design.id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(design.id)) throw Error('Use a lowercase hyphenated remix ID');
  if (!layers.length || layers.length > 3) throw Error('A remix uses one to three layers');
  resolveMacros(design.macros);
  for (const target of design.spectrum ?? []) {
    if (
      !['high', 'sub'].includes(target.band) ||
      !Number.isFinite(target.minShare) ||
      target.minShare < 0 ||
      target.minShare > 1
    ) {
      throw Error('Spectral targets require band high or sub and a minimum energy share in [0,1]');
    }
  }
  const params: Record<string, SoundParameter> = {};
  const first = layers[0].recipe;
  const paramKey = (index: number, key: string) => (layers.length === 1 ? key : 'layer' + (index + 1) + '_' + key);
  const tracks = layers.map(({ recipe, macros, gain = 1, offsetSec = 0, params: overrides = {} }, index) => {
    if (!Number.isFinite(gain) || gain < 0 || gain > 4) throw Error('Layer gain must be in [0,4]');
    if (!Number.isFinite(offsetSec) || offsetSec < 0) throw Error('Expected non-negative layer offset');
    for (const [key, value] of Object.entries(overrides)) {
      const spec = Object.hasOwn(recipe.params, key) && recipe.params[key];
      if (!spec || !Number.isFinite(value) || value < spec.min || value > spec.max) {
        throw Error(recipe.id + ': unknown or out-of-range DSP parameter ' + key);
      }
    }
    for (const [key, spec] of Object.entries(recipe.params)) {
      params[paramKey(index, key)] = { ...spec, default: overrides[key] ?? spec.default };
    }
    resolveMacros(macros);
    return { recipe, gain, offsetSec, macros };
  });
  if (!tracks.some((t) => t.gain > 0 && t.offsetSec === 0)) throw Error('Start one audible layer at offset zero');
  const durationSec = Math.max(...tracks.map((t) => t.offsetSec + renderDurationSec(t.recipe, t.macros)));
  const loopable = tracks.every((t) => t.recipe.loopable && t.offsetSec === 0);
  const credits = tracks
    .flatMap((t) => [t.recipe.recording, ...(t.recipe.additionalRecordings ?? [])])
    .filter((c) => c !== undefined);
  const unique = [...new Map(credits.map((c) => [c.url, c])).values()];
  const stereo = tracks.some((t) => Boolean(t.recipe.renderStereo));

  function mix(ctx: RenderContext, opts: ResolvedOptions, stereoOut: boolean) {
    const output = Array.from({ length: stereoOut ? 2 : 1 }, () => new Float32Array(ctx.frames));
    for (const [index, track] of tracks.entries()) {
      if (!track.gain) continue;
      const controls = Object.fromEntries(
        Object.keys(track.recipe.params).map((key) => [key, opts.params[paramKey(index, key)]]),
      );
      const audio = renderChannels(
        track.recipe,
        { seed: (opts.seed + index * 8191) >>> 0, params: controls, macros: track.macros },
        ctx.sampleRate,
      );
      const offset = Math.round(track.offsetSec * ctx.sampleRate);
      const length = track.recipe.loopable ? ctx.frames - offset : Math.min(audio[0].length, ctx.frames - offset);
      for (let i = 0; i < length; i++) {
        const frame = i % audio[0].length;
        if (stereoOut) {
          output[0][offset + i] += track.gain * audio[0][frame];
          output[1][offset + i] += track.gain * (audio[1] ?? audio[0])[frame];
        } else {
          const mono = audio.length === 1 ? audio[0][frame] : (audio[0][frame] + audio[1][frame]) * 0.5;
          output[0][offset + i] += track.gain * mono;
        }
      }
    }
    return output;
  }

  const result: SoundRecipe = {
    id: design.id,
    name: design.name ?? design.id,
    category: first.category,
    mixRole: first.mixRole,
    tags: [...new Set(['remix', ...first.tags, ...tracks.slice(1).map((t) => t.recipe.id)])],
    loopable,
    immediateOnset: !loopable,
    durationSec,
    spectrum: design.spectrum ?? first.spectrum,
    params,
    macros: design.macros,
    targetRmsDbfs: first.targetRmsDbfs,
    recording: unique[0],
    additionalRecordings: unique.slice(1),
    render: (ctx, opts) => mix(ctx, opts, false)[0],
    renderStereo: stereo
      ? (ctx, opts) => {
          const [left, right] = mix(ctx, opts, true);
          return [left, right];
        }
      : undefined,
  };
  if (durationSec > 120 || renderDurationSec(result) > 120 || renderDurationSec(result) < 0.01)
    throw Error('Remix duration must be 0.01 to 120 seconds');
  return result;
}
