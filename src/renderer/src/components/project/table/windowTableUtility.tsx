import { WindowDisplay } from '@shared/types/WindowDisplay.types'
import { createColumnHelper, rowSelectionFeature, tableFeatures } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'

export const windowTableFeatures = tableFeatures({
  rowSelectionFeature
})

export type WindowTableFeatures = typeof windowTableFeatures

const columnHelper = createColumnHelper<WindowTableFeatures, WindowDisplay>()

export const windowTableColumns = columnHelper.columns([
  columnHelper.accessor('roomName', {
    header: 'Room Name'
  }),

  columnHelper.accessor('windowName', {
    header: 'Window Name'
  }),

  columnHelper.accessor('width', {
    header: 'Width'
  }),

  columnHelper.accessor('height', {
    header: 'Height'
  }),

  columnHelper.accessor('fit', {
    header: 'Fit'
  }),

  columnHelper.accessor('blindCount', {
    header: 'Count'
  }),

  columnHelper.display({
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    )
  })
])
