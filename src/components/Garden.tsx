/**
 * A garden along the bottom of the page: three depth layers of grass with flowers
 * growing out of the middle one. Purely decorative, so it is hidden from assistive
 * tech and never takes pointer events.
 */

type Blade = { x: number; height: number; lean: number; sway: number; delay: number }

// Deterministic so the garden looks the same on every load rather than reshuffling.
const makeBlades = (count: number, seed: number, maxHeight: number): Blade[] =>
  Array.from({ length: count }, (_, i) => {
    const n = Math.sin((i + 1) * seed) * 43758.5453
    const r = n - Math.floor(n)
    const r2 = (Math.sin((i + 1) * seed * 1.7) * 24634.6345) % 1
    return {
      x: (i + 0.5) / count + (r - 0.5) * 0.012,
      height: maxHeight * (0.55 + r * 0.45),
      lean: (r2 - 0.5) * 16,
      sway: 3 + r * 3.5,
      delay: r * 4,
    }
  })

const FLOWERS = [
  { x: 0.08, height: 0.62, color: 'var(--pp-bloom-a)' },
  { x: 0.19, height: 0.78, color: 'var(--pp-bloom-b)' },
  { x: 0.31, height: 0.55, color: 'var(--pp-bloom-c)' },
  { x: 0.44, height: 0.83, color: 'var(--pp-bloom-a)' },
  { x: 0.57, height: 0.6, color: 'var(--pp-bloom-c)' },
  { x: 0.68, height: 0.75, color: 'var(--pp-bloom-b)' },
  { x: 0.79, height: 0.58, color: 'var(--pp-bloom-a)' },
  { x: 0.92, height: 0.8, color: 'var(--pp-bloom-c)' },
]

const GrassLayer = ({ blades, className }: { blades: Blade[]; className: string }) => (
  <div className={`pp-grass ${className}`}>
    {blades.map((blade, i) => (
      <span
        key={i}
        style={{
          left: `${blade.x * 100}%`,
          height: `${blade.height}%`,
          '--pp-lean': `${blade.lean}deg`,
          '--pp-sway': `${blade.sway}s`,
          '--pp-delay': `${blade.delay}s`,
        } as React.CSSProperties}
      />
    ))}
  </div>
)

export function Garden() {
  return (
    <div className="pp-garden" aria-hidden="true">
      <GrassLayer className="pp-grass-back" blades={makeBlades(46, 12.9898, 62)} />

      <div className="pp-flowers">
        {FLOWERS.map((flower, i) => (
          <span
            className="pp-flower"
            key={i}
            style={{
              left: `${flower.x * 100}%`,
              height: `${flower.height * 100}%`,
              '--pp-bloom': flower.color,
              '--pp-sway': `${5 + (i % 3) * 1.4}s`,
              '--pp-delay': `${i * 0.45}s`,
            } as React.CSSProperties}
          >
            <span className="pp-petals">
              <i /><i /><i /><i /><i />
              <b />
            </span>
          </span>
        ))}
      </div>

      <GrassLayer className="pp-grass-mid" blades={makeBlades(38, 78.233, 84)} />
      <GrassLayer className="pp-grass-front" blades={makeBlades(30, 39.425, 108)} />
    </div>
  )
}
