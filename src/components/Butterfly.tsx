import { useEffect, useRef } from 'react'
import { createButterflyState, stepButterfly, wanderTarget } from '../butterflyMotion'

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

    let state = createButterflyState(window.innerWidth * 0.5, window.innerHeight * 0.55)
    let targetX = state.x
    let targetY = state.y
    let frame: number | null = null
    const wanderPhase = Math.random() * 1000
    let hasPointer = false
    let idleSince = performance.now()

    const tick = (now: number) => {
      // A cursor that has sat still for a moment hands control back to the wander,
      // so the butterfly keeps living instead of parking on the pointer.
      if (!hasPointer || now - idleSince > 2600) {
        const drift = wanderTarget(now + wanderPhase, window.innerWidth, window.innerHeight)
        targetX = drift.x
        targetY = drift.y
      }

      state = stepButterfly(state, targetX, targetY)

      el.style.transform =
        `translate3d(${state.x.toFixed(1)}px, ${state.y.toFixed(1)}px, 0)` +
        ` rotate(${state.angle.toFixed(3)}rad) rotateY(${state.bank.toFixed(1)}deg)`
      el.style.setProperty('--pp-flap', `${state.flap.toFixed(2)}s`)

      frame = requestAnimationFrame(tick)
    }

    const onPointerMove = (event: PointerEvent) => {
      hasPointer = true
      idleSince = performance.now()
      targetX = event.clientX
      targetY = event.clientY
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
