import { WindowMeasurement } from '@shared/types/Project.types'
import { Fit } from '@shared/types/Window.types'

export function getWindowHeight(window: WindowMeasurement, fit: Fit): number | undefined {
  switch (fit) {
    case 'inside':
      return getInsideHeight(window)
    case 'outside':
      return getOutsideHeight(window)
    default:
      return undefined
  }
}

function getInsideHeight(window: WindowMeasurement): number | undefined {
  const { internalHeightL, internalHeightR } = window
  if (typeof internalHeightL === 'undefined' && typeof internalHeightR === 'undefined')
    return undefined

  return Math.max(internalHeightL, internalHeightR)
}

function getOutsideHeight(window: WindowMeasurement): number | undefined {
  const insideHeight = getInsideHeight(window)
  if (typeof insideHeight === 'undefined') return undefined

  const { blindAbove, blindUnderhang } = window
  if (typeof blindAbove === 'undefined' || typeof blindUnderhang === 'undefined') return undefined

  return insideHeight + blindAbove + blindUnderhang
}
