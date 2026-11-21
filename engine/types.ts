export type Category =
  | 'Weapons' | 'Zombies & Combat' | 'Weather & Ambience' | 'Footsteps & UI'
  | 'Animals' | 'Vehicles & Engines' | 'Aircraft' | 'Missiles'
  | 'Water & Fire' | 'Impacts' | 'Sci-Fi & UI';

export interface SoundParameter {
  label: string;
  min: number;
  max: number;
  default: number;
}

export interface SpectralExpectation {
  band: 'sub' | 'high';
  minShare: number;
}

export interface RenderContext {
  readonly sampleRate: number;
  readonly frames: number;
  random(): number;
}

export interface RenderOptions {
  seed?: number;
  params?: Readonly<Record<string, number>>;
}

export interface ResolvedOptions {
  readonly seed: number;
  readonly params: Readonly<Record<string, number>>;
}

export interface SoundRecipe {
  readonly id: string;
  readonly name: string;
  readonly category: Category;
  readonly tags: readonly string[];
  readonly loopable: boolean;
  readonly durationSec: number;
  readonly params: Readonly<Record<string, SoundParameter>>;
  readonly spectrum?: readonly SpectralExpectation[];
  render(ctx: RenderContext, opts: ResolvedOptions): Float32Array;
}
