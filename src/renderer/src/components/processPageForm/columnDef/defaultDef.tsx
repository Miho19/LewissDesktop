import ProcessPageEditableCell from '@/components/processPageForm/columnDef/ProcessPageEditableCell'
import { ProcessPageTableFeatures } from '@/components/processPageForm/ProcessPageTableUtility'
import { WindowTableEntry } from '@shared/types/WindowTableEntry.types'
import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<typeof ProcessPageTableFeatures, WindowTableEntry>()

export const processPageTableBaseColumnDef = columnHelper.columns([
  columnHelper.accessor((row) => row.tableEntry.location, {
    size: 250,
    minSize: 200,
    maxSize: 350,
    id: 'location',
    header: 'Location',
    cell: ProcessPageEditableCell
  }),

  columnHelper.accessor((row) => row.tableEntry.width, {
    id: 'width',
    header: 'Width (mm)'
  }),

  columnHelper.accessor((row) => row.tableEntry.height, {
    id: 'height',
    header: 'Height (mm)'
  }),

  columnHelper.accessor((row) => row.tableEntry.fit, {
    id: 'fit',
    header: 'Fit'
  })
])
