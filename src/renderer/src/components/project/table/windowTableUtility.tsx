import { WindowDisplay } from '@shared/types/WindowDisplay.types'
import { createColumnHelper, rowSelectionFeature, tableFeatures } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { capitalise } from '@/utility/general/capitalise'
import { getBlindTypeFromSpec } from '@/utility/process/worksheet/getBlindTypeFromSpec'

export const windowTableFeatures = tableFeatures({
  rowSelectionFeature
})

export type WindowTableFeatures = typeof windowTableFeatures

const columnHelper = createColumnHelper<WindowTableFeatures, WindowDisplay>()

export const windowTableColumns = columnHelper.columns([
  columnHelper.display({
    id: 'select',
    header: ({ table }) => {
      return (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      )
    },

    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    )
  }),
  columnHelper.accessor('roomName', {
    header: 'Room Name'
  }),

  columnHelper.accessor('windowName', {
    header: 'Window Name'
  }),

  columnHelper.accessor((row) => row.width.join(', '), {
    id: 'width',
    header: 'Width (mm)'
  }),

  columnHelper.accessor('height', {
    header: 'Height (mm)'
  }),

  columnHelper.accessor((row) => capitalise(row.fit), {
    id: 'fit',
    header: 'Fit'
  }),

  columnHelper.accessor((row) => capitalise(row.blindCount), {
    id: 'blindCount',
    header: 'Count'
  })
])
