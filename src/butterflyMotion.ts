export type ButterflyState = {
  x: number
  y: number
  angle: number
  bank: number
  flap: number
}

export const FOLLOW = 0.045
export const TURN = 0.12

export const createButterflyState = (x: number, y: number): ButterflyState =>
  ({ x, y, angle: 0, bank: 0, flap: 0.5 })

/** Shortest signed distance between two angles, in radians. */
export function angleDelta(from: number, to: number): number {
  let delta = to - from
  while (delta > Math.PI) delta -= Math.PI * 2
  while (delta < -Math.PI) delta += Math.PI * 2
  return delta
}

/**
 * Advances one frame toward the target. The butterfly closes a fixed fraction of
 * the gap, so it always trails rather than snapping, banks into the turn, and
 * flaps harder the further it has to go.
 */
export function stepButterfly(state: ButterflyState, targetX: number, targetY: number): ButterflyState {
  const dx = targetX - state.x
  const dy = targetY - state.y
  const distance = Math.hypot(dx, dy)

  let angle = state.angle
  if (distance > 1.5) {
    // Drawn nose-up, so travelling right is a quarter turn clockwise.
    angle += angleDelta(angle, Math.atan2(dy, dx) + Math.PI / 2) * TURN
  }

  return {
    x: state.x + dx * FOLLOW,
    y: state.y + dy * FOLLOW,
    angle,
    bank: Math.max(-18, Math.min(18, dx * 0.08)),
    flap: Math.max(0.22, 0.5 - Math.min(distance, 600) / 2200),
  }
}

/**
 * Where the butterfly drifts with no pointer to follow. Two periods that do not
 * divide evenly, so the path never visibly loops.
 */
export function wanderTarget(now: number, width: number, height: number) {
  return {
    x: width * (0.5 + 0.26 * Math.sin(now * 0.00021)),
    y: height * (0.45 + 0.2 * Math.sin(now * 0.00033 + 1.2)),
  }
}
