import { Blind } from '@shared/types/blind/blind.types'
import { VenetianBlindOptions } from '@shared/types/blind/venetian.types'

export * from './control'
export * from './valance'
export * from './cutOut'
export * from './spacerBlock'
export * from './dimension'
export * from './palladianShelf'

export function lewissVenetianIsBlindTypeValid(blindType: Blind) {
  if (typeof blindType !== 'string') return false

  const optionSet = new Set<string>(VenetianBlindOptions)

  return optionSet.has(blindType)
}
