import { Treatment } from './Project.types'

export const FitOption = ['inside', 'outside'] as const

export type Fit = (typeof FitOption)[number]

export const BlindCountOption = ['single', 'dual', 'butting'] as const
export type BlindCount = (typeof BlindCountOption)[number]

export type WindowDisplay = {
  windowId: string
  roomId: string
  fit: Fit
  blindCount: BlindCount
  width: number[]
  height: number
  treatment: Treatment
}
