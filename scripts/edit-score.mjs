import { deviceKind, feedbackFor, excludedTraits } from './edit-device.mjs';
import { contextOrder, levelMatch, scoreGain, softerEdge } from './edit-context.mjs';

// A picture event owns its sound. Words printed inside the interface do not describe the source.
const basic = {
  press: ['desktop-mouse-press', 'glass-trackpad-press'],
  tab: ['settings-tab-walnut-detent', 'settings-subtab-porcelain-tip'],
  'toggle-on': ['settings-toggle-engage-brass'],
  'toggle-off': ['settings-toggle-off-cork'],
  type: ['laptop-scissor-keyboard-key-down', 'gasket-mount-keyboard-key-down'],
  slide: ['silk-swipe-left', 'silk-swipe-right'],
  drag: ['menu-item-lifted-for-dragging'],
  snap: ['menu-item-snaps-into-a-slot'],
  confirm: ['settings-apply-overcentre-latch'],
  back: ['settings-back-suede-release'],
  cut: ['soft-air-match-cut'],
  logo: ['logo-felt-signature'],
};
const optional = {
  focus: 'settings-focus-felt-tick',
  scroll: 'settings-slider-knurled-index',
  undo: 'edit-undo-return',
  redo: 'edit-redo-seat',
  disabled: 'settings-list-edge-felt-bumper',
};
const quiet = new Set([
  'stream',
  'hold',
  'hover',
  'cursor',
  'reading',
  'code-output',
  'autofill',
  'spinner',
  'progress',
  'loading',
  'animation',
  'auto-reveal',
]);
const optIn = new Set(['slide', 'cut', 'logo', 'focus', 'scroll']);
const weight = {
  snap: 8,
  'toggle-on': 7,
  'toggle-off': 7,
  tab: 6,
  confirm: 6,
  back: 6,
  type: 5,
  paste: 5,
  drag: 4,
  press: 3,
  slide: 2,
  focus: 1,
  cut: 1,
  logo: 1,
};
function eventPriority(event) {
  return event.priority ?? (event.physicalContact ? 9 : (weight[event.action] ?? 0));
}
const db = {
  press: -1,
  tab: -1,
  'toggle-on': 0,
  'toggle-off': 0,
  type: -3,
  paste: -3,
  slide: -5,
  logo: -6,
  cut: -5,
  focus: -5,
};
export const defaultPalette = Object.values(basic).flat();
export function eligible(s) {
  return s && s.isolation === 'isolated' && !s.cleanHold && !s.auditionNote;
}
function stableSeed(name) {
  let seed = 2166136261;
  for (const c of name) seed = Math.imul(seed ^ c.charCodeAt(0), 16777619);
  return seed >>> 0;
}
function integer(value, name, lo, hi) {
  if (!Number.isSafeInteger(value) || value < lo || value > hi) throw Error('Invalid ' + name + ': ' + value);
  return value;
}
export function clock(input) {
  if (typeof input.fps !== 'number' && !(typeof input.fps === 'string' && /^\d+\/\d+$/.test(input.fps)))
    throw Error('Supply a numeric or rational project fps');
  const [num, den = 1] = String(input.fps).split('/').map(Number),
    fps = num / den;
  if (!Number.isFinite(fps) || fps < 1 || fps > 240) throw Error('Invalid picture frame rate');
  const durationFrames = integer(input.durationFrames, 'picture duration', 1, Number.MAX_SAFE_INTEGER);
  return { fps, durationFrames };
}
const namePattern = /^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,119}$/;
function checkEvent(e, ids, durationFrames) {
  if (!e || !namePattern.test(e.id ?? '') || typeof e.id !== 'string' || ids.has(e.id))
    throw Error('Missing, invalid or duplicate cue ID: ' + e?.id);
  ids.add(e.id);
  if (typeof e.action !== 'string' || !e.action) throw Error('Supply an observed action for ' + e.id);
  integer(e.frame, 'cue frame', 0, durationFrames - 1);
  if (e.endFrame !== undefined) integer(e.endFrame, 'end frame', e.frame + 1, durationFrames);
  if (e.syncFrame !== undefined)
    integer(
      e.syncFrame,
      'sync frame',
      e.frame,
      e.endFrame === undefined ? durationFrames - 1 : Math.min(e.endFrame, durationFrames - 1),
    );
  for (const field of ['accent', 'underSpeech', 'muted', 'physicalContact'])
    if (e[field] !== undefined && typeof e[field] !== 'boolean') throw Error('Expected boolean ' + field);
  if (e.gesture !== undefined && (typeof e.gesture !== 'string' || !e.gesture))
    throw Error('Supply a gesture ID');
  for (const field of ['device', 'target', 'label'])
    if (e[field] !== undefined && typeof e[field] !== 'string') throw Error('Expected text for ' + field);
  if (e.priority !== undefined && !Number.isFinite(e.priority)) throw Error('Expected numeric priority');
  if (e.sourceContact !== undefined && ![true, false, 'uncertain'].includes(e.sourceContact))
    throw Error('Expected an observed sourceContact');
  if (e.keyFrames !== undefined) {
    if (e.action !== 'type' || !Array.isArray(e.keyFrames) || !e.keyFrames.length)
      throw Error('keyFrames require observed typing');
    e.keyFrames.forEach((f, i) =>
      integer(
        f,
        'keystroke frame',
        i ? e.keyFrames[i - 1] + 1 : e.frame,
        Math.min(durationFrames - 1, e.endFrame ?? durationFrames - 1),
      ),
    );
  }
}
function optionsFor(e, palette) {
  if (e.soundId) return [e.soundId];
  if (feedbackFor(e, e.deviceKind) === 'surface')
    return [e.deviceKind === 'touch' ? 'fingertip-on-display-glass' : 'stylus-tip-on-tablet-glass'];
  if (feedbackFor(e, e.deviceKind) === 'digital') return ['settings-focus-felt-tick'];
  const physical = {
    'pen-button': ['stylus-barrel-press'],
    trackball: ['trackball-press'],
    trackpad: [basic.press[1]],
    mouse: [basic.press[0], 'quiet-mouse-press'],
    unspecified: [basic.press[0], 'quiet-mouse-press'],
    keyboard: [basic.type[0]],
    mechanical: [basic.type[1]],
    controller: ['settings-focus-felt-tick'],
  };
  if (e.action === 'paste' && ['keyboard', 'mechanical'].includes(e.deviceKind))
    return [
      e.deviceKind === 'mechanical' ? 'gasket-mount-keyboard-shortcut' : 'laptop-scissor-keyboard-shortcut',
    ];
  if (e.action === 'press' || e.action === 'paste') return physical[e.deviceKind] ?? [];
  if (e.action === 'type')
    return e.deviceKind === 'mechanical'
      ? [basic.type[1]]
      : ['unspecified', 'keyboard'].includes(e.deviceKind)
        ? [basic.type[0]]
        : [];
  if (e.action === 'slide')
    return ['left', 'right'].includes(e.direction)
      ? ['silk-swipe-' + e.direction, 'velvet-swipe-' + e.direction]
      : [];
  if (e.action === 'tab' && palette === 'crisp') return [...basic.tab].reverse();
  if (e.action === 'notice') return ['menu-confirm-pluck', 'menu-confirm-spring-detent'];
  if (e.action === 'confirm') return [...basic.confirm, 'menu-confirm-spring-detent'];
  if (e.action === 'cut') return [...basic.cut, 'linen-match-cut'];
  if (e.action === 'logo') return [...basic.logo, 'delicate-logo-close'];
  return [...(basic[e.action] ?? (optional[e.action] ? [optional[e.action]] : []))];
}
function pick(e, profile, votes, bank, mode) {
  const baseIds = contextOrder(optionsFor(e, profile.palette), mode);
  const preferred = profile.bindings?.[e.action];
  if (!e.soundId && preferred && baseIds.includes(preferred))
    baseIds.splice(0, baseIds.length, preferred, ...baseIds.filter((id) => id !== preferred));
  const choices = baseIds
    .map((id) => bank.get(id))
    .filter(eligible)
    .filter(
      (s) =>
        !excludedTraits(e.avoid).some((word) =>
          [s.id, ...s.tags]
            .join(' ')
            .toLowerCase()
            .split(/[\s-]+/)
            .includes(word),
        ),
    );
  const use = profile.useCase;
  const preference = (s) => {
    const ballot = votes[s.id];
    if (!ballot || (ballot.revision ?? 1) !== (s.revision ?? 1) || (ballot.useCase && ballot.useCase !== use))
      return 0;
    return ['no', 'rejected'].includes(ballot.decision)
      ? -1
      : ['yes', 'approved'].includes(ballot.decision)
        ? 1
        : 0;
  };
  return choices.filter((s) => preference(s) >= 0).sort((a, b) => preference(b) - preference(a));
}
function performance(e, s, fps, project, mode, speechAt, track) {
  const speed =
    e.action === 'slide' && e.endFrame !== undefined
      ? Math.max(0.85, Math.min(1.25, (s.durationSec * fps) / (e.endFrame - e.frame)))
      : 1;
  const marker = s.markers ?? {};
  const markerSec =
    marker.seat ?? marker.commit ?? marker.apex ?? marker.contact ?? marker.step ?? marker.release ?? 0;
  // Center a brief accent on visible motion; fitting a short swipe to an entire slow pan would pitch it down.
  const frame =
    e.syncFrame ??
    (e.action === 'slide' && e.endFrame !== undefined ? Math.floor((e.frame + e.endFrame) / 2) : e.frame);
  const base = (db[e.action] ?? -2) + (e.deviceKind === 'touch' ? -4 : 0);
  const gainAt = (f) => scoreGain(base, s.id, f, fps, mode, speechAt(f), track);
  return {
    soundId: s.id,
    revision: s.revision ?? 1,
    seed: stableSeed(project + '/' + e.id),
    syncFrame: frame,
    markerSec,
    speed,
    gainDb: gainAt(e.keyFrames?.[0] ?? frame),
    ...(e.keyFrames?.length && track
      ? { keyGainOffsets: e.keyFrames.map((f) => Number((gainAt(f) - gainAt(e.keyFrames[0])).toFixed(2))) }
      : {}),
    ...(e.keyFrames ? { keyFrames: e.keyFrames } : {}),
  };
}
// Imported edit timelines may have separate input and state markers. Pair only unambiguous observations.
function inputOwners(events, fps) {
  const states = new Map(),
    matches = new Map(),
    paired = new Map();
  const transitions = new Set(['tab', 'toggle-on', 'toggle-off', 'confirm', 'back', 'snap']);
  for (const e of events) {
    if (e.gesture || !transitions.has(e.action)) continue;
    if (!states.has(e.frame)) states.set(e.frame, []);
    states.get(e.frame).push(e);
  }
  for (const e of events) {
    if (e.action !== 'press' || e.gesture) continue;
    const candidates = [];
    const last = e.frame + (e.target ? Math.floor(0.08 * fps) : 0);
    for (let frame = e.frame; frame <= last; frame++) {
      for (const state of states.get(frame) ?? []) if (state.target === e.target) candidates.push(state.id);
    }
    if (candidates.length !== 1) continue;
    const [state] = candidates;
    if (!matches.has(state)) matches.set(state, []);
    matches.get(state).push(e.id);
  }
  for (const [state, presses] of matches) if (presses.length === 1) paired.set(presses[0], state);
  return paired;
}
export function planEdit(input, catalog, profile = {}, votes = {}, track) {
  const { fps, durationFrames } = clock(input);
  if (!Array.isArray(input.events))
    throw Error('Supply observed picture events; an empty list scores a silent edit.');
  const bank = new Map(catalog.map((s) => [s.id, s])),
    ids = new Set(),
    groups = new Map();
  const project = input.id ?? 'picture';
  const speech = input.speech ?? [];
  if (!Array.isArray(speech)) throw Error('Expected speech frame ranges');
  for (const span of speech) {
    if (!Array.isArray(span) || span.length !== 2) throw Error('Supply [firstFrame, endFrame] for speech');
    integer(span[0], 'speech start', 0, durationFrames - 1);
    integer(span[1], 'speech end', span[0] + 1, durationFrames);
  }
  const style = { ...profile, useCase: profile.useCase ?? input.format ?? 'product' };
  for (const e of input.events) checkEvent(e, ids, durationFrames);
  for (const config of [input, ...input.events]) {
    if (config.feedback !== undefined && !['natural', 'none', 'subtle'].includes(config.feedback))
      throw Error('Unknown feedback policy');
    if (
      config.avoid !== undefined &&
      (!Array.isArray(config.avoid) || config.avoid.some((s) => typeof s !== 'string' || !s.trim()))
    )
      throw Error('Expected an array of excluded sound traits');
    if (config.device !== undefined && typeof config.device !== 'string')
      throw Error('Expected a device name');
    if (config.context !== undefined && !['normal', 'rapid', 'hero', 'speech'].includes(config.context))
      throw Error('Unknown audition context');
  }
  if (input.maxAddedContacts !== undefined)
    integer(input.maxAddedContacts, 'added-contact budget', 0, Number.MAX_SAFE_INTEGER);
  const paired = inputOwners(input.events, fps);
  for (const e of input.events) {
    const group = e.gesture ? 'gesture/' + e.gesture : 'cue/' + (paired.get(e.id) ?? e.id);
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(e);
  }
  const cues = [];
  const priority = new Map(input.events.map((e) => [e.id, eventPriority(e)]));
  for (const events of groups.values()) {
    const ranked = [...events].sort((a, b) => eventPriority(b) - eventPriority(a) || a.frame - b.frame);
    const existing = ranked.find((e) => e.sourceContact === true);
    const uncertain = ranked.find((e) => e.sourceContact === 'uncertain');
    const contact = ranked.find((x) => ['press', 'type', 'paste'].includes(x.action) && x.device);
    const avoid = [...(input.avoid ?? []), ...events.flatMap((x) => x.avoid ?? [])].map((x) =>
      x.trim().toLowerCase(),
    );
    const quietGesture = ranked.some((x) => x.feedback === 'none');
    let owner;
    for (const event of ranked) {
      const device =
        event.device ??
        contact?.device ??
        input.device ??
        (['type', 'paste'].includes(event.action) ? style.keyboard : undefined);
      const e = {
        ...event,
        device,
        deviceKind: deviceKind(device),
        feedback: quietGesture ? 'none' : (event.feedback ?? contact?.feedback ?? input.feedback),
        avoid,
      };
      const policy = feedbackFor(e, e.deviceKind);
      const out = {
        id: e.id,
        frame: e.frame,
        action: e.action,
        ...(e.gesture ? { gesture: e.gesture } : {}),
        ...(e.label ? { label: e.label } : {}),
      };
      const navigation =
        ['controller', 'keyboard', 'mechanical'].includes(e.deviceKind) &&
        ['scroll', 'focus'].includes(e.action);
      const silent =
        e.muted ||
        policy === 'silence' ||
        quiet.has(e.action) ||
        (optIn.has(e.action) && !navigation && !e.accent && !e.soundId);
      if (existing)
        Object.assign(out, {
          decision: event === existing ? 'reuse' : 'silence',
          reason: 'Original audio carries this gesture',
        });
      else if (silent) Object.assign(out, { decision: 'silence', reason: 'Picture carries this beat' });
      else if (uncertain || owner || policy === 'review')
        Object.assign(out, {
          decision: owner ? 'silence' : 'review',
          reason: owner
            ? 'Covered by ' + owner
            : uncertain
              ? 'Check source audio at this gesture'
              : 'Identify the physical contact or reuse the original',
        });
      else {
        const speechAt = (f) =>
          event.underSpeech ??
          (events.some((x) => x.underSpeech) || speech.some(([lo, hi]) => lo <= f && f < hi));
        const underSpeech = (e.keyFrames ?? [e.syncFrame ?? e.frame]).some(speechAt);
        const nearby =
          ['tab', 'focus', 'scroll', 'press'].includes(e.action) &&
          input.events.some(
            (x) =>
              x.action === e.action &&
              x.id !== e.id &&
              !events.includes(x) &&
              !x.muted &&
              Math.abs(x.frame - e.frame) / fps < 0.45,
          );
        const mode = e.context ?? input.context ?? (underSpeech ? 'speech' : nearby ? 'rapid' : undefined);
        const [sound, ...alternatives] = pick(e, style, votes, bank, mode === 'normal' ? undefined : mode);
        if (!sound || (e.action === 'type' && !e.keyFrames && e.endFrame !== undefined)) {
          Object.assign(out, {
            decision: 'review',
            reason: sound
              ? 'Spot the visible key-down frames'
              : 'Choose a clean match for this action or direction',
          });
        } else {
          owner = e.id;
          Object.assign(out, {
            decision: 'play',
            ...performance(e, sound, fps, project, mode, speechAt, track),
            perspective: 'listener',
            device: e.deviceKind,
            context: mode ?? 'normal',
            alternatives: alternatives.map((s) => s.id),
          });
        }
      }
      cues.push(out);
    }
  }
  if (input.maxAddedContacts !== undefined) {
    let remaining = input.maxAddedContacts;
    const ordered = cues
      .filter((c) => c.decision === 'play')
      .sort((a, b) => priority.get(b.id) - priority.get(a.id) || a.frame - b.frame);
    for (const cue of ordered) {
      const count = cue.keyFrames?.length ?? 1;
      if (count <= remaining) remaining -= count;
      else {
        // A typed phrase is one observed performance. Keep its timing intact when the budget is too small.
        for (const field of [
          'soundId',
          'revision',
          'seed',
          'syncFrame',
          'markerSec',
          'speed',
          'gainDb',
          'keyFrames',
          'keyGainOffsets',
          'alternatives',
        ])
          delete cue[field];
        Object.assign(cue, {
          decision: 'silence',
          reason: 'Reserved the requested contacts for higher-priority gestures',
        });
      }
    }
  }
  return {
    schemaVersion: 1,
    id: project,
    fps: input.fps,
    durationFrames,
    useCase: style.useCase,
    palette: style.palette ?? 'soft',
    cues: cues.sort((a, b) => a.frame - b.frame || a.id.localeCompare(b.id)),
  };
}
export function reviseEdit(plan, changes, catalog) {
  const next = structuredClone(plan),
    seen = new Set(),
    { durationFrames } = clock(plan);
  if (!Array.isArray(changes) || !changes.length) throw Error('Supply an array of cue changes');
  const expanded = changes.flatMap((change) => {
    if (!change.action) return [change];
    if (change.id) throw Error('Address a cue by id or action');
    const { action, ...settings } = change;
    const matches = next.cues.filter(
      (c) => !c.locked && c.action === action && (c.decision === 'play' || c.muted),
    );
    if (!matches.length) throw Error('No scored cues for ' + action);
    return matches.map((c) => ({ ...settings, id: c.id }));
  });
  for (const change of expanded) {
    const {
      id,
      mute,
      gainDb,
      trimDb,
      shiftFrames,
      soundId: requestedSound,
      lock,
      character,
      ...other
    } = change;
    let soundId = requestedSound;
    const cue = next.cues.find((c) => c.id === id);
    if (
      !cue ||
      seen.has(id) ||
      Object.keys(other).length ||
      [mute, gainDb, trimDb, shiftFrames, soundId, lock, character].every((v) => v === undefined)
    )
      throw Error('Invalid edit for ' + id);
    seen.add(id);
    if (lock !== undefined && typeof lock !== 'boolean') throw Error('Expected boolean lock');
    if (
      cue.locked &&
      lock !== false &&
      [mute, gainDb, trimDb, shiftFrames, soundId, character].some((x) => x !== undefined)
    )
      throw Error('Unlock the approved cue before revising ' + id);
    if (lock !== undefined) cue.locked = lock;
    if ([mute, gainDb, trimDb, shiftFrames, soundId, character].every((x) => x === undefined)) continue;
    if (mute !== undefined && typeof mute !== 'boolean') throw Error('Expected boolean mute');
    if (cue.decision !== 'play' && !(cue.soundId && cue.muted))
      throw Error('Revise source observations before adding sound to ' + id);
    if (character !== undefined) {
      if (character !== 'less-bright' || soundId !== undefined)
        throw Error('Specify less-bright or a replacement take');
      soundId = softerEdge(cue.soundId, cue.alternatives ?? []);
      if (!soundId) cue.edgeDb = Math.max(-12, (cue.edgeDb ?? 0) - 4);
    }
    if (soundId !== undefined) {
      const sound = catalog.find((s) => s.id === soundId);
      if (!eligible(sound)) throw Error('Replacement needs a clean, reviewed source for ' + id);
      if (cue.alternatives?.includes(sound.id)) {
        cue.gainDb = Math.max(-80, Math.min(12, cue.gainDb + levelMatch(cue.soundId, sound.id)));
        cue.alternatives = [cue.soundId, ...cue.alternatives.filter((id) => id !== sound.id)];
      } else if (cue.soundId !== sound.id) cue.alternatives = [];
      cue.soundId = sound.id;
      cue.revision = sound.revision ?? 1;
      const m = sound.markers ?? {};
      cue.markerSec = m.seat ?? m.commit ?? m.apex ?? m.contact ?? m.step ?? m.release ?? 0;
      cue.speed = 1;
    }
    if (gainDb !== undefined || trimDb !== undefined) {
      if (gainDb !== undefined && trimDb !== undefined)
        throw Error('Specify absolute gain or a relative trim');
      const gain = trimDb === undefined ? gainDb : cue.gainDb + trimDb;
      if (!Number.isFinite(gain) || gain < -80 || gain > 12) throw Error('Invalid gainDb');
      cue.gainDb = gain;
    }
    if (shiftFrames !== undefined) {
      integer(shiftFrames, 'frame shift', -durationFrames, durationFrames);
      cue.frame = integer(cue.frame + shiftFrames, 'frame', 0, durationFrames - 1);
      cue.syncFrame = integer(cue.syncFrame + shiftFrames, 'sync frame', 0, durationFrames - 1);
      if (cue.keyFrames)
        cue.keyFrames = cue.keyFrames.map((f) =>
          integer(f + shiftFrames, 'key frame', 0, durationFrames - 1),
        );
    }
    if (mute !== undefined) {
      cue.muted = mute;
      cue.decision = mute ? 'silence' : 'play';
    }
  }
  next.cues.sort((a, b) => a.frame - b.frame || a.id.localeCompare(b.id));
  return next;
}
