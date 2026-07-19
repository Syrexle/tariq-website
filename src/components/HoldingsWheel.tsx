import { useState } from 'react'
import { holdings, portfolioAsOf } from '../portfolioData'
import {
  clearAllocationSelection,
  resolveAllocation,
  segmentClipPath,
  selectAllocation,
} from '../portfolioInteractions'

export function HoldingsWheel() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [previewIndex, setPreviewIndex] = useState<number | null>(null)
  const activeIndex = resolveAllocation(selectedIndex, previewIndex)
  const activeHolding = activeIndex === null ? null : holdings[activeIndex]

  let offset = 0
  const segments = holdings.map((holding) => {
    const start = offset
    offset += holding.allocation
    return { holding, start }
  })

  return (
    <div className="holdings-interactive">
      <div className="holdings-chart">
        <svg className="holdings-svg" viewBox="0 0 100 100" aria-label="Current portfolio allocation ratios">
          <circle className="holdings-track" cx="50" cy="50" r="38" pathLength="100" />
          {segments.map(({ holding, start }, index) => (
              <circle
                className={`holdings-segment${activeIndex === index ? ' is-active' : ''}`}
                key={holding.asset}
                cx="50"
                cy="50"
                r="38"
                pathLength="100"
                fill="none"
                stroke={holding.color}
                strokeDasharray={`${holding.allocation} ${100 - holding.allocation}`}
                strokeDashoffset={-start}
                transform="rotate(-90 50 50)"
                aria-hidden="true"
                focusable="false"
              />
          ))}
        </svg>

        <div className="holdings-segment-controls">
          {segments.map(({ holding, start }, index) => (
            <button
              className="holdings-hitarea"
              style={{ clipPath: segmentClipPath(start, holding.allocation) }}
              type="button"
              key={holding.asset}
              aria-label={`${holding.asset}, ${holding.allocation}% of current allocation`}
              aria-pressed={selectedIndex === index}
              aria-controls="holdings-active-allocation"
              onMouseEnter={() => setPreviewIndex(index)}
              onMouseLeave={() => setPreviewIndex(null)}
              onFocus={() => setSelectedIndex(index)}
              onBlur={() => setSelectedIndex(clearAllocationSelection())}
              onClick={() => setSelectedIndex(selectAllocation(index))}
            />
          ))}
        </div>

        <div className="holdings-center" id="holdings-active-allocation" aria-live="polite">
          {activeHolding ? (
            <>
              <strong>{activeHolding.asset}</strong>
              <span>{activeHolding.allocation}%</span>
            </>
          ) : (
            <>
              <strong>Explore allocation</strong>
              <span>Hover, focus, or tap</span>
            </>
          )}
        </div>
      </div>

      <p className="holdings-status">As of: {portfolioAsOf}</p>

      <div className="holdings-mobile-list" aria-label="Current allocation ratio list">
        {holdings.map((holding) => (
          <div key={holding.asset}>
            <span className="holding-swatch" style={{ background: holding.color }} />
            <strong>{holding.asset}</strong>
            <small>{holding.allocation}%</small>
          </div>
        ))}
      </div>
    </div>
  )
}
