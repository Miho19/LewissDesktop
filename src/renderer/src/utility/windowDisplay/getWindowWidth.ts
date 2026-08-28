import { WindowMeasurement } from '@shared/types/Project.types'
import { Fit } from '@shared/types/Window.types'
import { getBlindCountDisplay } from './getBlindCountDisplay'

export function getWindowWidth(window: WindowMeasurement, fit: Fit): number[] | undefined {
  switch (fit) {
    case 'inside':
      return getWidthInside(window)
    case 'outside':
      return getWidthOutside(window)
    default:
      return undefined
  }
}

function getWidthInside(window: WindowMeasurement): number[] | undefined {
  if (!isValidWindowInside(window)) return undefined

  const blindCount = getBlindCountDisplay(window.blindCount)
  if (typeof blindCount === 'undefined') return undefined

  if (blindCount === 'single' || blindCount === 'dual') return [window.internalWidth]

  if (typeof window.blindLeftWidth === 'undefined') return undefined

  try {
    const leftWidth = parseInt(window.blindLeftWidth)
    return [leftWidth, window.internalWidth - leftWidth]
  } catch (error) {
    return undefined
  }
}

function isValidWindowInside(window: WindowMeasurement) {
  if (typeof window.internalWidth === 'undefined' || typeof window.blindCount === 'undefined')
    return false
  return true
}

function getWidthOutside(window: WindowMeasurement): number[] | undefined {
  if (!isValidWindowOutside(window)) return undefined

  const { internalWidth, blindLeft, blindRight, outsideBlindCount } = window

  const outsideWidth = internalWidth + blindLeft + blindRight

  const blindCount = getBlindCountDisplay(outsideBlindCount)
  if (typeof blindCount === 'undefined') return undefined
  if (blindCount === 'single' || blindCount === 'dual') return [outsideWidth]

  try {
    const outsideBlindLeft = parseInt(window.outsideBlindLeftWidth)
    return [outsideBlindLeft, outsideWidth - outsideBlindLeft]
  } catch (error) {
    return undefined
  }
}

function isValidWindowOutside(window: WindowMeasurement): boolean {
  if (
    typeof window.internalWidth === 'undefined' ||
    typeof window.blindLeft === 'undefined' ||
    typeof window.blindRight === 'undefined' ||
    typeof window.outsideBlindCount === 'undefined'
  ) {
    return false
  }

  return true
}
