import { useEffect, useRef } from 'react'

type Cleanup = () => void

/**
 * Tilts the avatar card toward the pointer and moves a glare highlight with it.
 * Without a pointer the card drifts on its own, and a device that reports
 * orientation takes over from the drift. Everything is inert under
 * prefers-reduced-motion.
 */
export function useTiltParallax() {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const floatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const card = parallaxRef.current
    const float = floatRef.current
    if (!card || !float) return

    const teardown: Cleanup[] = []
    let targetX = 0, targetY = 0, targetGlare = 0
    let x = 0, y = 0, glare = 0
    let frame: number | null = null

    const tick = () => {
      x += (targetX - x) * 0.1
      y += (targetY - y) * 0.1
      glare += (targetGlare - glare) * 0.1
      card.style.transform =
        `perspective(900px) rotateX(${(-y * 0.6).toFixed(2)}deg) rotateY(${(x * 0.65).toFixed(2)}deg)` +
        ` translate(${(x * 0.3).toFixed(2)}px, ${(y * 0.3).toFixed(2)}px)`
      float.style.setProperty('--gx', `${(50 + x * 2.4).toFixed(1)}%`)
      float.style.setProperty('--gy', `${(38 + y * 2.8).toFixed(1)}%`)
      float.style.setProperty('--go', glare.toFixed(3))
      const settled = Math.abs(targetX - x) + Math.abs(targetY - y) + Math.abs(targetGlare - glare) <= 0.05
      frame = settled ? null : requestAnimationFrame(tick)
    }

    const wake = () => { if (frame === null) frame = requestAnimationFrame(tick) }

    // Every input aims at the same target, so the spring, the glare, and the rest
    // position are shared and a phone behaves exactly like a cursor.
    const aim = (nx: number, ny: number) => {
      targetX = nx * 24
      targetY = ny * 18
      targetGlare = Math.min(1, Math.sqrt(nx * nx + ny * ny) * 2.2)
      wake()
    }

    const listen = <T extends keyof WindowEventMap>(
      target: Window | Document | HTMLElement,
      type: T | string,
      handler: EventListenerOrEventListenerObject,
      options?: AddEventListenerOptions,
    ) => {
      target.addEventListener(type, handler, options)
      teardown.push(() => target.removeEventListener(type, handler, options))
    }

    const onPointerMove = (event: Event) => {
      const e = event as PointerEvent
      aim(e.clientX / window.innerWidth - 0.5, e.clientY / window.innerHeight - 0.5)
    }
    listen(window, 'pointermove', onPointerMove, { passive: true })
    listen(document.documentElement, 'mouseleave', () => {
      targetX = 0; targetY = 0; targetGlare = 0
      wake()
    })

    // A phone has no cursor to follow and iOS will not hand over the gyroscope
    // without a prompt, so on touch devices the card moves by itself. A finger
    // takes over the moment one lands, and the drift resumes after it lifts.
    let drifting = false
    let driftFrame: number | null = null
    let driftStart = 0
    let resume: ReturnType<typeof setTimeout> | null = null

    const drift = (now: number) => {
      if (!drifting) { driftFrame = null; return }
      if (!driftStart) driftStart = now
      const t = now - driftStart
      // Two periods that do not divide evenly, so the orbit never visibly loops.
      aim(0.3 * Math.sin(t * 0.00037), 0.22 * Math.sin(t * 0.00053 + 1.1))
      driftFrame = requestAnimationFrame(drift)
    }
    const startDrift = () => {
      if (drifting || document.hidden || !window.matchMedia('(pointer: coarse)').matches) return
      drifting = true
      if (driftFrame === null) driftFrame = requestAnimationFrame(drift)
    }
    const stopDrift = () => {
      drifting = false
      if (resume) { clearTimeout(resume); resume = null }
    }
    const scheduleResume = () => {
      if (resume) clearTimeout(resume)
      resume = setTimeout(startDrift, 3000)
    }

    listen(window, 'pointerdown', stopDrift, { passive: true })
    listen(window, 'pointerup', scheduleResume, { passive: true })
    // A touch that turns into a scroll ends in pointercancel rather than pointerup,
    // so without this the first swipe would stop the drift for good.
    listen(window, 'pointercancel', scheduleResume, { passive: true })
    listen(document, 'visibilitychange', () => {
      if (document.hidden) stopDrift(); else startDrift()
    })
    startDrift()

    // Readings are relative to however the device is held when the first one
    // lands, so resting at a natural angle reads as centred.
    let base: { x: number; y: number } | null = null
    const onOrient = (event: Event) => {
      const e = event as DeviceOrientationEvent
      if (e.beta === null || e.gamma === null) return
      stopDrift()
      const angle = window.screen.orientation?.angle ?? 0
      let gx = e.gamma
      let gy = e.beta
      if (angle === 90) { gx = e.beta; gy = -e.gamma }
      else if (angle === 270 || angle === -90) { gx = -e.beta; gy = e.gamma }
      if (base === null) base = { x: gx, y: gy }
      const clamp = (value: number) => Math.max(-0.5, Math.min(0.5, value))
      aim(clamp((gx - base.x) / 40), clamp((gy - base.y) / 40))
    }
    listen(window, 'orientationchange', () => { base = null })

    type PermissionCapableDOE = typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<PermissionState | 'granted' | 'denied'>
    }
    const DOE: PermissionCapableDOE | undefined =
      typeof DeviceOrientationEvent === 'undefined' ? undefined : DeviceOrientationEvent

    if (DOE && typeof DOE.requestPermission === 'function') {
      // iOS only releases motion data from a user gesture, so the first tap that is
      // neither a link nor a tooltip label asks for it. Those two keep their own
      // behaviour: navigating, and opening a tooltip.
      let startX = 0, startY = 0
      listen(window, 'touchstart', (event: Event) => {
        const touch = (event as TouchEvent).touches[0]
        if (touch) { startX = touch.clientX; startY = touch.clientY }
      }, { passive: true })

      const ask = (event: Event) => {
        const target = event.target
        if (target instanceof Element && target.closest('a,[data-tip]')) return
        // A scroll also ends in a touchend, and that is not a user activation:
        // requesting on it gets rejected, spending the only chance to ask.
        const touch = (event as TouchEvent).changedTouches?.[0]
        if (touch && Math.abs(touch.clientX - startX) + Math.abs(touch.clientY - startY) > 10) return
        DOE.requestPermission!().then((state) => {
          if (state === 'granted') listen(window, 'deviceorientation', onOrient, { passive: true })
          if (state === 'granted' || state === 'denied') window.removeEventListener('touchend', ask)
        }).catch(() => {})
      }
      listen(window, 'touchend', ask, { passive: true })
    } else if (DOE) {
      listen(window, 'deviceorientation', onOrient, { passive: true })
    }

    return () => {
      stopDrift()
      if (frame !== null) cancelAnimationFrame(frame)
      if (driftFrame !== null) cancelAnimationFrame(driftFrame)
      for (const off of teardown) off()
    }
  }, [])

  return { parallaxRef, floatRef }
}
