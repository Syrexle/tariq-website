import { useState } from 'react'
import { impactMilestones, type ImpactMilestone } from '../portfolioData'

function ImpactDetail({ milestone }: { milestone: ImpactMilestone }) {
  return (
    <div className="impact-detail-content">
      {milestone.description && <p>{milestone.description}</p>}

      {milestone.sectors && (
        <ul className="impact-sector-map" aria-label="Ecosystem collaboration focus areas">
          {milestone.sectors.map((sector) => (
            <li key={sector.company}>
              <strong>{sector.company}</strong>
              <span>{sector.focus}</span>
            </li>
          ))}
        </ul>
      )}

      {milestone.proofUrl && (
        <a href={milestone.proofUrl} target="_blank" rel="noreferrer">
          [ View supporting post → ]
        </a>
      )}
    </div>
  )
}

export function ImpactRail() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [previewIndex, setPreviewIndex] = useState<number | null>(null)
  const activeIndex = previewIndex ?? selectedIndex
  const activeMilestone = impactMilestones[activeIndex]

  return (
    <div className="impact-experience">
      <div className="impact-rail" role="list" aria-label="Selected impact milestones">
        {impactMilestones.map((milestone, index) => {
          const isActive = activeIndex === index

          return (
            <div className={`impact-milestone${isActive ? ' is-active' : ''}`} role="listitem" key={milestone.id}>
              <button
                type="button"
                aria-pressed={selectedIndex === index}
                onMouseEnter={() => setPreviewIndex(index)}
                onMouseLeave={() => setPreviewIndex(null)}
                onFocus={() => setSelectedIndex(index)}
                onBlur={() => setPreviewIndex(null)}
                onClick={() => setSelectedIndex(index)}
              >
                <span className="impact-node" aria-hidden="true" />
                <span className="impact-index">{String(index + 1).padStart(2, '0')}</span>
                <strong>{milestone.title}</strong>
              </button>

              {isActive && (
                <div className="milestone-mobile-detail" aria-live="polite">
                  <ImpactDetail milestone={milestone} />
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="impact-detail" aria-live="polite">
        <span>{String(activeIndex + 1).padStart(2, '0')} / {activeMilestone.title}</span>
        <ImpactDetail milestone={activeMilestone} />
      </div>
    </div>
  )
}
