import { WindowTableMeta } from '@shared/types/WindowTableEntry.types'
import {
  columnResizingFeature,
  columnSizingFeature,
  metaHelper,
  tableFeatures
} from '@tanstack/react-table'

export const ProcessPageTableFeatures = tableFeatures({
  columnSizingFeature,
  columnResizingFeature,
  tableMeta: metaHelper<WindowTableMeta>()
})
