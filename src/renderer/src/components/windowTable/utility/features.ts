import { rowSelectionFeature, tableFeatures } from '@tanstack/react-table'

export const windowTableFeatures = tableFeatures({
  rowSelectionFeature
})

export type WindowTableFeatures = typeof windowTableFeatures
