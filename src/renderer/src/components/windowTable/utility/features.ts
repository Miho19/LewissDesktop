import { rowSelectionFeature, tableFeatures } from '@tanstack/react-table'

export const windowFormTableFeatures = tableFeatures({
  rowSelectionFeature
})

export type WindowFormTableFeatures = typeof windowFormTableFeatures
