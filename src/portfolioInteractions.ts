export type AllocationSelection = number | null

export function resolveAllocation(
  selectedIndex: AllocationSelection,
  previewIndex: AllocationSelection,
) {
  return previewIndex ?? selectedIndex
}

export function selectAllocation(index: number): AllocationSelection {
  return index
}

export function clearAllocationSelection(): AllocationSelection {
  return null
}

export function segmentClipPath(start: number, allocation: number) {
  const startAngle = -90 + start * 3.6
  const endAngle = startAngle + allocation * 3.6
  const points = ['50% 50%']

  for (let angle = startAngle; angle < endAngle; angle += 6) {
    const radians = angle * Math.PI / 180
    points.push(`${50 + 50 * Math.cos(radians)}% ${50 + 50 * Math.sin(radians)}%`)
  }

  const endRadians = endAngle * Math.PI / 180
  points.push(`${50 + 50 * Math.cos(endRadians)}% ${50 + 50 * Math.sin(endRadians)}%`)

  return `polygon(${points.join(', ')})`
}
