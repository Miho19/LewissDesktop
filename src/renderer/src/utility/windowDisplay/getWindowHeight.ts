import { WindowMeasurement } from 'shared/types/Project.types'
import { Fit } from 'shared/types/Window.types'

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
  return undefined
}

function getOutsideHeight(window: WindowMeasurement): number | undefined {
  return undefined
}
