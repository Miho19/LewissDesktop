import { WindowTableEntry } from '@shared/types/WindowTableEntry.types'
import {
  columnResizingFeature,
  columnSizingFeature,
  createColumnHelper,
  tableFeatures
} from '@tanstack/react-table'

export const ProcessPageTableFeatures = tableFeatures({
  columnSizingFeature,
  columnResizingFeature
})

const columnHelper = createColumnHelper<typeof ProcessPageTableFeatures, WindowTableEntry>()

export const ProcessPageTableColumn = columnHelper.columns([])
