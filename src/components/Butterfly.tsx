import { useEffect, useRef } from 'react'
import {
  LANDED,
  createButterflyState,
  settleAngle,
  stepButterfly,
  wanderTarget,
  type RestSpot,
} from '../butterflyMotion'

/**
 * A butterfly that trails the cursor. It never quite catches up, banks into its
 * turns, and flaps faster the harder it is working. With no pointer to follow it
 * wanders on its own, and under prefers-reduced-motion it does not render at all.
 */
export function Butterfly() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) return

    const el = ref.current
    if (!el) return

    // How long a still cursor waits before the butterfly gives up and lands.
    const IDLE_MS = 2200
    let pointerX = 0
    let pointerY = 0

    let state = createButterflyState(window.innerWidth * 0.5, window.innerHeight * 0.55)
    let targetX = state.x
    let targetY = state.y
    let frame: number | null = null
    const wanderPhase = Math.random() * 1000
    let hasPointer = false
    let idleSince = performance.now()
    let restSpot: RestSpot | null = null
    let landed = false

    // The nameplate is read live rather than measured once: it floats and tilts, so
    // a perched butterfly has to ride it instead of hovering where it used to be.
    const perch = (): RestSpot | null => {
      const plate = document.querySelector('.pp-plate')
      if (!plate) return null
      const box = plate.getBoundingClientRect()
      // Sit on the top edge rather than in the middle of the key.
      return { x: box.left + box.width / 2, y: box.top - 9 }
    }

    const setLanded = (value: boolean) => {
      if (landed === value) return
      landed = value
      el.classList.toggle('is-resting', value)
    }

    const tick = (now: number) => {
      const idle = !hasPointer || now - idleSince > IDLE_MS

      if (idle) {
        restSpot = perch()
        if (restSpot) {
          targetX = restSpot.x
          targetY = restSpot.y
        } else {
          // No nameplate to land on; fall back to drifting.
          const drift = wanderTarget(now + wanderPhase, window.innerWidth, window.innerHeight)
          targetX = drift.x
          targetY = drift.y
        }
      } else {
        restSpot = null
        setLanded(false)
        targetX = pointerX
        targetY = pointerY
      }

      state = stepButterfly(state, targetX, targetY)

      if (restSpot && Math.hypot(restSpot.x - state.x, restSpot.y - state.y) < LANDED) {
        setLanded(true)
      }

      if (landed && restSpot) {
        // Perched: ride the plate exactly, fold upright, and breathe.
        state = {
          ...state,
          x: restSpot.x,
          y: restSpot.y + Math.sin(now * 0.0022) * 1.1,
          angle: settleAngle(state.angle),
          bank: state.bank * 0.9,
        }
      }

      el.style.transform =
        `translate3d(${state.x.toFixed(1)}px, ${state.y.toFixed(1)}px, 0)` +
        ` rotate(${state.angle.toFixed(3)}rad) rotateY(${state.bank.toFixed(1)}deg)`
      el.style.setProperty('--pp-flap', `${state.flap.toFixed(2)}s`)

      frame = requestAnimationFrame(tick)
    }

    const onPointerMove = (event: PointerEvent) => {
      hasPointer = true
      idleSince = performance.now()
      pointerX = event.clientX
      pointerY = event.clientY
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    frame = requestAnimationFrame(tick)

    const onVisibility = () => {
      if (document.hidden) {
        if (frame !== null) { cancelAnimationFrame(frame); frame = null }
      } else if (frame === null) {
        frame = requestAnimationFrame(tick)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibility)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="pp-butterfly" ref={ref} aria-hidden="true">
      <svg viewBox="-30 -26 60 52" width="46" height="40">
        <defs>
          <linearGradient id="pp-wing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7ef0f2" />
            <stop offset="55%" stopColor="#58e5e8" />
            <stop offset="100%" stopColor="#f5a43b" />
          </linearGradient>
        </defs>
        <g className="pp-wing pp-wing-l">
          <path d="M-1-4C-9-22-27-24-27-11-27-2-16 4-1 5Z" fill="url(#pp-wing)" opacity=".92" />
          <path d="M-1 5C-13 6-24 11-22 19-20 25-8 21-1 12Z" fill="url(#pp-wing)" opacity=".7" />
        </g>
        <g className="pp-wing pp-wing-r">
          <path d="M1-4C9-22 27-24 27-11 27-2 16 4 1 5Z" fill="url(#pp-wing)" opacity=".92" />
          <path d="M1 5C13 6 24 11 22 19 20 25 8 21 1 12Z" fill="url(#pp-wing)" opacity=".7" />
        </g>
        <ellipse cx="0" cy="2" rx="1.7" ry="11" fill="#0a241c" />
        <path d="M0-8C-2-13-5-15-7-16M0-8C2-13 5-15 7-16" stroke="#0a241c" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  )
}
