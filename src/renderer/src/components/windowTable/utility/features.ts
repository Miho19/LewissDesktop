import { WindowTableMeta } from '@shared/types/WindowTableEntry.types'
import {
  columnResizingFeature,
  columnSizingFeature,
  metaHelper,
  rowSelectionFeature,
  tableFeatures
} from '@tanstack/react-table'

export const windowFormTableFeatures = tableFeatures({
  rowSelectionFeature,
  columnSizingFeature,
  columnResizingFeature,
  tableMeta: metaHelper<WindowTableMeta>()
})

export type WindowFormTableFeatures = typeof windowFormTableFeatures
