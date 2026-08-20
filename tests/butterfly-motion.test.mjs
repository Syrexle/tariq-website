import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  LANDED,
  angleDelta,
  createButterflyState,
  pickRestSpot,
  settleAngle,
  stepButterfly,
  wanderTarget,
} from '../src/butterflyMotion.ts'

const page = readFileSync('src/pages/ProjectsPage.tsx', 'utf8')
const styles = readFileSync('src/projectsPage.css', 'utf8')
const component = readFileSync('src/components/Butterfly.tsx', 'utf8')

test('the butterfly closes on the cursor without ever snapping to it', () => {
  let state = createButterflyState(0, 0)
  const target = { x: 400, y: 300 }

  const first = stepButterfly(state, target.x, target.y)
  assert.ok(first.x > 0 && first.x < target.x, 'moves toward the target but not onto it')
  assert.ok(first.y > 0 && first.y < target.y)

  let previous = Math.hypot(target.x - state.x, target.y - state.y)
  for (let i = 0; i < 120; i++) {
    state = stepButterfly(state, target.x, target.y)
    const distance = Math.hypot(target.x - state.x, target.y - state.y)
    assert.ok(distance < previous, `frame ${i} should shrink the gap`)
    previous = distance
  }
  assert.ok(previous < 2, `should be close after 120 frames, was ${previous.toFixed(2)}`)
})

test('it turns the short way around rather than unwinding', () => {
  assert.equal(angleDelta(0, Math.PI / 2).toFixed(4), (Math.PI / 2).toFixed(4))
  // Crossing the wrap point must turn a little, not almost all the way round.
  assert.ok(Math.abs(angleDelta(3.0, -3.0)) < 0.6)
  assert.ok(Math.abs(angleDelta(-3.0, 3.0)) < 0.6)
})

test('it points the way it is travelling', () => {
  // Drawn nose-up, so a target to the right settles near a quarter turn.
  let state = createButterflyState(0, 0)
  for (let i = 0; i < 200; i++) state = stepButterfly(state, 900, 0)
  assert.ok(Math.abs(angleDelta(state.angle, Math.PI / 2)) < 0.1, `angle was ${state.angle}`)

  let up = createButterflyState(0, 0)
  for (let i = 0; i < 200; i++) up = stepButterfly(up, 0, -900)
  assert.ok(Math.abs(angleDelta(up.angle, 0)) < 0.1, `angle was ${up.angle}`)
})

test('it flaps harder the further it has to go, and banks into turns', () => {
  const near = stepButterfly(createButterflyState(0, 0), 10, 0)
  const far = stepButterfly(createButterflyState(0, 0), 1200, 0)
  assert.ok(far.flap < near.flap, 'a longer chase means a shorter flap cycle')
  assert.ok(far.flap >= 0.22, 'flap stays above the floor')

  assert.ok(stepButterfly(createButterflyState(0, 0), 500, 0).bank > 0)
  assert.ok(stepButterfly(createButterflyState(0, 0), -500, 0).bank < 0)
  assert.ok(Math.abs(stepButterfly(createButterflyState(0, 0), 99999, 0).bank) <= 18)
})

test('the idle wander stays on screen and does not loop', () => {
  const seen = new Set()
  for (let t = 0; t < 400000; t += 250) {
    const { x, y } = wanderTarget(t, 1280, 800)
    assert.ok(x > 0 && x < 1280, `x off screen at ${t}`)
    assert.ok(y > 0 && y < 800, `y off screen at ${t}`)
    seen.add(`${Math.round(x)},${Math.round(y)}`)
  }
  assert.ok(seen.size > 1200, `expected a wandering path, got ${seen.size} points`)
})

test('the butterfly never intercepts a click and yields to reduced motion', () => {
  const rule = styles.match(/\.pp-butterfly\s*\{([^}]*)\}/s)
  assert.ok(rule, 'expected a .pp-butterfly rule')
  assert.match(rule[1], /pointer-events:\s*none/)
  assert.match(component, /matchMedia\('\(prefers-reduced-motion: reduce\)'\)/)
  assert.match(component, /if \(reduced\.matches\) return/)
  assert.match(component, /visibilitychange/)
})

test('the garden is decorative and inert', () => {
  const rule = styles.match(/\.pp-garden\s*\{([^}]*)\}/s)
  assert.ok(rule, 'expected a .pp-garden rule')
  assert.match(rule[1], /pointer-events:\s*none/)
  assert.match(page, /<Garden \/>/)
  assert.match(page, /<Butterfly \/>/)
  const reduced = styles.match(/@media \(prefers-reduced-motion: reduce\) \{([\s\S]*?)\n\}/g).join('\n')
  assert.match(reduced, /pp-grass span/)
})

test('it makes for the nearest bloom rather than the far side of the garden', () => {
  const blooms = [
    { x: 60, y: 700 },
    { x: 640, y: 690 },
    { x: 1220, y: 705 },
  ]
  assert.deepEqual(pickRestSpot(80, 400, blooms), blooms[0])
  assert.deepEqual(pickRestSpot(600, 300, blooms), blooms[1])
  assert.deepEqual(pickRestSpot(1200, 200, blooms), blooms[2])
  assert.equal(pickRestSpot(0, 0, []), null, 'no garden means nothing to land on')
})

test('it actually reaches the bloom it picked', () => {
  const bloom = { x: 640, y: 690 }
  let state = createButterflyState(120, 180)
  let frames = 0
  while (Math.hypot(bloom.x - state.x, bloom.y - state.y) >= LANDED && frames < 600) {
    state = stepButterfly(state, bloom.x, bloom.y)
    frames++
  }
  assert.ok(frames < 600, 'should land within a reasonable flight')
  assert.ok(Math.hypot(bloom.x - state.x, bloom.y - state.y) < LANDED)
})

test('a landed butterfly folds upright', () => {
  let angle = Math.PI / 2
  for (let i = 0; i < 200; i++) angle = settleAngle(angle)
  assert.ok(Math.abs(angle) < 0.05, `expected upright, got ${angle}`)

  // And it settles from the other direction too, without spinning the long way.
  let other = -2.6
  for (let i = 0; i < 200; i++) other = settleAngle(other)
  assert.ok(Math.abs(other) < 0.05, `expected upright, got ${other}`)
})

test('the resting pose is wired to a class the component toggles', () => {
  assert.match(styles, /\.pp-butterfly\.is-resting \.pp-wing \{[^}]*animation-duration/)
  assert.match(component, /classList\.toggle\('is-resting'/)
  assert.match(component, /pickRestSpot/)
  // Landing is the idle behaviour; drifting is only the no-garden fallback.
  const idleBranch = component.match(/if \(idle\) \{([\s\S]*?)\n      \} else \{/)?.[1] ?? ''
  assert.match(idleBranch, /pickRestSpot/)
  assert.ok(
    idleBranch.indexOf('pickRestSpot') < idleBranch.indexOf('wanderTarget'),
    'a bloom should be preferred over drifting',
  )
  assert.match(idleBranch, /No garden to land in/)
})
