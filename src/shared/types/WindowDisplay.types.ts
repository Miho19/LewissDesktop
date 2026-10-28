import { Spec } from '@shared/types/spec/Spec.types'

export const FitOption = ['inside', 'outside'] as const

export type Fit = (typeof FitOption)[number]

export function isValidFit(fit: string): fit is Fit {
  return (FitOption as readonly string[]).includes(fit.toLocaleLowerCase())
}

export const BlindCountOption = ['single', 'dual', 'butting'] as const
export type BlindCount = (typeof BlindCountOption)[number]

export type WindowDisplay = {
  windowId: string
  roomId: string
  roomName: string
  windowName: string
  fit: Fit
  blindCount: BlindCount
  width: number[]
  height: number
  spec: Spec
}
