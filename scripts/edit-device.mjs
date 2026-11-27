// A virtual contact has no switch mechanism. A named piece of hardware can have both.
export function deviceKind(value = '') {
  const text = value.toLowerCase().replace(/[-_]/g, ' ');
  if (!text.trim()) return 'unspecified';
  if (/\b(trackpad|touchpad)\b/.test(text)) return 'trackpad';
  if (/\b(stylus|pencil|pen)\b/.test(text))
    return /\b(barrel|side button)\b/.test(text) ? 'pen-button' : 'pen-tip';
  if (
    /\b(touch|touchscreen|screen keyboard|onscreen|virtual keyboard|soft keyboard|software keyboard|phone|iphone|ipad|tablet|mobile|android|finger)\b/.test(
      text,
    )
  )
    return 'touch';
  if (/trackball/.test(text)) return 'trackball';
  if (/\b(mouse|desktop|pointer)\b/.test(text)) return 'mouse';
  if (/mechanical/.test(text)) return 'mechanical';
  if (/\b(keyboard|laptop|notebook)\b/.test(text)) return 'keyboard';
  if (/controller|gamepad/.test(text)) return 'controller';
  return 'unknown';
}

const switchActions = new Set(['press','paste','tab','back','confirm','toggle-on','toggle-off','undo','redo','disabled']);
const pointers = new Set(['mouse','trackpad','trackball','pen-button']);
export function physicalSwitch(event) {
  return pointers.has(event.deviceKind) && switchActions.has(event.action) && !event.soundId && event.feedback !== 'subtle';
}
export function feedbackFor(event, device) {
  const contact = ['press','type','paste'].includes(event.action);
  if (event.feedback === 'none') return 'silence';
  if (event.soundId) return;
  if (event.physicalContact && event.action === 'press' && ['touch','pen-tip'].includes(device)) return 'surface';
  if (device === 'touch' && (contact || switchActions.has(event.action))) return event.feedback === 'subtle' || event.accent ? 'digital' : 'silence';
  if (!contact) return;
  if (device === 'pen-tip' || device === 'unknown') return 'review';
  if (event.action === 'paste' && device === 'unspecified') return 'silence';
}

export function stripButtonLabel(query) {
  return query
    .replace(/\b(Generate|Launch|Render|Export|Publish|Save)\s+(button|control)\b/g, '$2')
    .replace(
      /\b((?:button|tab|control)(?:\s+(?:labe(?:l|ll)ed|called|named|reading)))\s+(?:"[^"]*"|“[^”]*”|'[^']*'|[\w-]+)/gi,
      (_, prefix) => prefix.split(/\s/)[0],
    )
    .replace(/(?:"[^"]*"|“[^”]*”|'[^']*')\s+(button|tab|control)\b/gi, '$1');
}

// Apply touch defaults only to a physical input request. A phone ringing or an explicitly
// designed tab confirmation is its own audible performance.
export function silentTouchRequest(query) {
  return (
    deviceKind(query) === 'touch' &&
    /\b(tap(?:ping)?|typ(?:e|es|ing)|key(?:board|press)|press(?:ing)?)\b/i.test(query) &&
    !/\b(closeup|close|glass|feedback|tick|audible|chime|confirmation|foley|recorded|haptic|toggle|tab switch)\b/i.test(
      query,
    )
  );
}

export function contactQuery(raw) {
  const query = stripButtonLabel(raw);
  // For composite briefs or qualifiers outside this vocabulary the full retrieval
  // path can explain any unfulfilled terms, including a requested recording.
  const simple =
    /^(?:a|an|the|on|of|to|from|at|in|with|for|one|single|my|some|please|sound|sfx|physical|close|up|quiet|soft|subtle|short|tactile|foley|glass|display|tablet|phone|smartphone|touchscreen|touch|screen|pen|pencil|tip|nib|stylus|finger|fingertip|pad|tap|taps|tapping|contact|press|typing|feedback|tick|button|control)$/;
  if ((query.toLowerCase().match(/[a-z0-9]+/g) ?? []).some((w) => !simple.test(w))) return query;
  if (
    /\b(?:stylus|pen|pencil) (?:tip|nib)\b/i.test(query) &&
    /glass/i.test(query) &&
    /tap|contact|press/i.test(query) &&
    !/barrel|without|double|release|drag/i.test(query)
  )
    return 'stylus-tip-on-tablet-glass';
  if (
    /fingertip|finger pad/i.test(query) &&
    /glass/i.test(query) &&
    /close|physical|foley/i.test(query) &&
    !/without|double|release|drag|recorded/i.test(query)
  )
    return 'fingertip-on-display-glass';
  const phoneInput = deviceKind(query) === 'touch' && /\b(?:tap|typing|press)\b/i.test(query);
  if (
    phoneInput &&
    /\b(?:subtle|quiet|soft|tactile|single|short) (?:feedback|tick)|\bfeedback (?:tick|tap)\b/i.test(query) &&
    !/\b(?:no|not|without|chime|reverb|ringing|double|three)\b/i.test(query)
  )
    return 'settings-focus-felt-tick';
  return query;
}

export function excludedTraits(words) {
  const traits = new Set(words);
  if (traits.has('chime'))
    for (const word of ['plucked', 'pluck', 'chimes', 'jingle', 'melody', 'melodic', 'bell'])
      traits.add(word);
  return [...traits];
}

export function ambiguousPenRequest(query) {
  const subject = stripButtonLabel(query);
  return (
    contactQuery(subject) === subject &&
    deviceKind(subject) === 'pen-tip' &&
    /\b(?:press|tap|click)\b/i.test(subject)
  );
}
