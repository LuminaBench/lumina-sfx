import { clamp, rng } from './dsp.ts';
import { renderSound } from './render.ts';
import type { SoundRecipe } from './types.ts';

export interface FootstepRecipe extends SoundRecipe { readonly takeCount: number }
export type Foot = 'left' | 'right';
export type Gait = 'sneak' | 'walk' | 'sprint';
export type PlantMotion = 'steady' | 'push-off' | 'brake' | 'pivot';
export type Travel = 'forward' | 'backward' | 'left' | 'right';
export interface GroundPose { x: number; z: number; yaw?: number }
export interface Plant {
  foot?: Foot;
  /** Numeric effort interpolates sneak (0), walk (0.5) and sprint (1). */
  gait?: Gait | number;
  footwear?: 'shoe' | 'boot';
  weight?: number;
  wetness?: number;
  travel?: Travel;
  motion?: PlantMotion;
  actor?: GroundPose;
  /** Optional world position of the planted sole from the animation or IK rig. */
  contactPosition?: {x: number; z: number};
  listener?: GroundPose;
  grounded?: boolean;
  /** Unique per animation contact, including the loop number. */
  eventId?: string | number;
}
export interface FootContact {
  recipe: FootstepRecipe; foot: Foot; take: number; gain: number; pan: number;
  params: Record<string, number>;
}
export const gaitEffort: Readonly<Record<Gait, number>> = {sneak: 0, walk: .5, sprint: 1};
export const stepIntervalSec: Readonly<Record<Gait, number>> = {sneak: .76, walk: .54, sprint: .319};
interface Bag { remaining: number[]; last?: number }
function draw(bag: Bag, count: number, side: number, random: () => number) {
  if (!bag.remaining.length) {
    for (let i = side; i < count; i += 2) bag.remaining.push(i);
    for (let i = bag.remaining.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [bag.remaining[i], bag.remaining[j]] = [bag.remaining[j], bag.remaining[i]];
    }
    const end = bag.remaining.length - 1;
    if (end > 0 && bag.remaining[end] === bag.last)
      [bag.remaining[0], bag.remaining[end]] = [bag.remaining[end], bag.remaining[0]];
  }
  return bag.last = bag.remaining.pop()!;
}

function spatial(foot: Foot, {actor, listener, contactPosition}: Plant) {
  const side = foot === 'left' ? -1 : 1;
  const yaw = actor?.yaw ?? 0;
  const source = contactPosition ?? (actor && {
    x: actor.x + side * .13 * Math.cos(yaw),
    z: actor.z + side * .13 * Math.sin(yaw),
  });
  if (!source) return {pan: side * .09, level: 1};
  const ear = listener?.yaw ?? 0;
  const x = source.x - (listener?.x ?? 0);
  const z = source.z - (listener?.z ?? 0);
  const distance = Math.hypot(x, z);
  return {pan: .84 * (x * Math.cos(ear) + z * Math.sin(ear)) / Math.max(1.15, distance),
    level: 1 / (1 + .26 * Math.max(0, distance - 1))};
}

/** One instance per character; call only on a planted foot. Holds no timer or audio device. */
export class FootstepWalker {
  private readonly random: () => number;
  private nextFoot: Foot = 'left';
  private bags = new WeakMap<FootstepRecipe, [Bag, Bag]>();
  private seen = new Set<string | number>();

  constructor(seed = 104729) { this.random = rng(seed); }

  plant(recipe: FootstepRecipe, input: Plant = {}): FootContact | null {
    if (input.grounded === false || (input.eventId !== undefined && this.seen.has(input.eventId))) return null;
    if (!Number.isInteger(recipe.takeCount) || recipe.takeCount < 4) throw Error('Expected a multi-take foot contact');
    const poses: (GroundPose | undefined)[] = [input.actor, input.listener, input.contactPosition];
    for (const pose of poses) {
      if (pose && ![pose.x, pose.z, pose.yaw ?? 0].every(Number.isFinite))
        throw new RangeError('Footstep positions and heading must be finite');
    }
    if (![input.weight ?? .5, input.wetness ?? 0].every(Number.isFinite))
      throw new RangeError('Footstep weight and wetness must be finite');
    const gait = typeof input.gait === 'number' ? input.gait : gaitEffort[input.gait ?? 'walk'];
    if (!Number.isFinite(gait) || gait < 0 || gait > 1) throw new RangeError('Expected gait effort from 0 to 1');
    if (input.eventId !== undefined) {
      this.seen.add(input.eventId);
      if (this.seen.size > 32) this.seen.delete(this.seen.values().next().value!);
    }
    const foot = input.foot ?? this.nextFoot;
    this.nextFoot = foot === 'left' ? 'right' : 'left';
    let bags = this.bags.get(recipe);
    if (!bags) { bags = [{remaining: []}, {remaining: []}]; this.bags.set(recipe, bags); }
    const side = foot === 'left' ? 0 : 1;
    const take = draw(bags[side], recipe.takeCount, side, this.random);
    const weight = clamp(input.weight ?? .5, 0, 1), wetness = clamp(input.wetness ?? 0, 0, 1);
    const travel = input.travel ?? 'forward';
    const lateralScuff = travel === 'forward' ? 0 : travel === 'backward' ? .65 : travel === foot ? .85 : .42;
    const motion = input.motion ?? 'steady';
    const scuff = Math.max(lateralScuff, motion === 'pivot' ? 1 : motion === 'brake' ? .56 : 0);
    const load = clamp(weight + (motion === 'brake' ? .18 : motion === 'push-off' ? -.12 : 0), 0, 1);
    const accent = motion === 'push-off' ? -.12 : motion === 'pivot' ? -.22 : 0;
    const effort = clamp(gait + accent, 0, 1);
    const {pan, level} = spatial(foot, input);
    const gain = contactGain(effort, load) * (.94 + .12 * this.random()) * level;
    // Discrete sole profiles are shared by live and offline renders. Gain and position stay continuous.
    const profileGait = clamp(Math.round(gait * 32) / 32 + accent, 0, 1);
    const params = {gait: profileGait, weight: Math.round(load * 8) / 8, wetness: Math.round(wetness * 8) / 8,
      scuff, boot: input.footwear === 'boot' ? 1 : 0};
    return {recipe, foot, take, gain, pan, params};
  }
}

export function contactGain(gait: number, weight: number) {
  return (.39 + .61 * gait) * (.83 + .30 * weight);
}

export function contactSamples(contact: FootContact, sampleRate = 44100): Float32Array {
  return renderSound(contact.recipe, {seed: contact.take, params: contact.params}, sampleRate);
}

// Characters sharing an audio context can reuse the same rendered soles.
type BufferCache = Map<string, { recipe: FootstepRecipe; buffer: AudioBuffer }>;
const contextBuffers = new WeakMap<BaseAudioContext, BufferCache>();

/** Browser playback, including take history across surface changes. The optional output is the game's Foley bus. */
export class FootstepPlayer {
  readonly walker: FootstepWalker;
  private buffers: BufferCache;
  private context: BaseAudioContext;
  private output: AudioNode;
  constructor(context: BaseAudioContext, options: {output?: AudioNode; seed?: number} = {}) {
    this.context = context;
    this.output = options.output ?? context.destination;
    this.buffers = contextBuffers.get(context) ?? new Map();
    contextBuffers.set(context, this.buffers);
    this.walker = new FootstepWalker(options.seed ?? Math.floor(Math.random() * 2 ** 32));
  }
  plant(recipe: FootstepRecipe, input: Plant = {}, when = this.context.currentTime) {
    if (!Number.isFinite(when) || when < 0) throw new RangeError('Expected a nonnegative audio time');
    const hit = this.walker.plant(recipe, input);
    if (!hit) return null;
    const key = JSON.stringify([recipe.id, hit.take, hit.params]);
    const entry = this.buffers.get(key);
    let buffer = entry?.recipe === recipe ? entry.buffer : undefined;
    if (!buffer) {
      const pcm = contactSamples(hit, this.context.sampleRate);
      buffer = this.context.createBuffer(1, pcm.length, this.context.sampleRate);
      buffer.getChannelData(0).set(pcm);
      if (this.buffers.size >= 48) this.buffers.delete(this.buffers.keys().next().value!);
      this.buffers.set(key, {recipe, buffer});
    }
    const source = this.context.createBufferSource(), gain = this.context.createGain(), pan = this.context.createStereoPanner();
    source.buffer = buffer;
    gain.gain.value = hit.gain;
    pan.pan.value = hit.pan;
    source.connect(gain).connect(pan).connect(this.output);
    source.onended = () => { source.disconnect(); gain.disconnect(); pan.disconnect(); };
    source.start(when);
    return hit;
  }
}
