// Catalog evidence only, independent of the user's proposed trajectory.
export function sourcePerspective(s) {
  const words = [s.id, s.perspective, ...(s.contains??[]), ...(s.components??[])].filter(Boolean).join(' ').replaceAll('-', ' ').toLowerCase();
  return {
    local: s.mixRole === 'interface' || (s.tags ?? []).includes('cursor'),
    physicalInput:
      (s.tags ?? []).some((t) => t === 'keyboard' || t === 'device') && (s.tags ?? []).includes('launch'),
    motion: s.perspective!=='stationary exterior emitter' && /\b(fly ?by|pass by|passby|drive by|passes|climbout beyond runway)\b/.test(words),
    distance: /\b(distant|far away|far field)\b/.test(words),
    room: /\b(canyon echo|room tail|hangar echo|corridor echo|room reverb|church reverb)\b/.test(words),
  };
}
export function geometryConflict(s, layer) {
  const p = sourcePerspective(s),
    placement = layer.placement;
  if (p.local && !p.physicalInput && (layer.acoustics || (placement && placement.kind !== 'listener')))
    return 'This interface cue follows the listener. Choose a physical world source for a located emitter.';
  if (p.motion && (placement?.path?.length || placement?.doppler))
    return 'This performance already travels. Choose a stationary take for a new path or Doppler shift.';
  if (
    p.distance &&
    (layer.acoustics?.distanceM !== undefined || placement?.position || layer.macros?.distance > 0)
  )
    return 'This performance already contains distance. Choose a close take for calculated distance.';
  if (p.room && (placement?.room || (layer.macros?.space && layer.macros.space !== 'dry')))
    return 'This performance has a recorded or designed tail. Choose a dry take for a new room.';
}
