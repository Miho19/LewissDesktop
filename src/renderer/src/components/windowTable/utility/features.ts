import { WindowTableMeta } from '@shared/types/WindowTableForm.types'
import { metaHelper, rowSelectionFeature, tableFeatures } from '@tanstack/react-table'

export const windowFormTableFeatures = tableFeatures({
  rowSelectionFeature,
  tableMeta: metaHelper<WindowTableMeta>()
})

export type WindowFormTableFeatures = typeof windowFormTableFeatures
