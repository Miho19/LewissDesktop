import { WindowTableEntry } from '@shared/types/WindowTableForm.types'
import { createColumnHelper } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { capitalise } from '@/utility/general/capitalise'
import { WindowFormTableFeatures } from '@/components/windowTable/utility/features'

export const windowTableColumnHelper = createColumnHelper<
  WindowFormTableFeatures,
  WindowTableEntry
>()

export const editableDefaultColumnId: string[] = [
  'roomName',
  'windowName',
  'width',
  'height',
  'fit'
] as const

export const windowTableColumnBase = windowTableColumnHelper.columns([
  windowTableColumnHelper.display({
    id: 'select',
    header: ({ table }) => {
      return (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          onClick={(e) => e.stopPropagation()}
        />
      )
    },

    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        onClick={(e) => e.stopPropagation()}
      />
    )
  }),
  windowTableColumnHelper.accessor((row) => row.windowDisplay.roomName, {
    id: 'roomName',
    header: 'Room Name'
  }),

  windowTableColumnHelper.accessor((row) => row.windowDisplay.windowName, {
    id: 'windowName',
    header: 'Window Name'
  }),

  windowTableColumnHelper.accessor((row) => row.tableEntry.width, {
    id: 'width',
    header: 'Width (mm)'
  }),

  windowTableColumnHelper.accessor((row) => row.tableEntry.height, {
    id: 'height',
    header: 'Height (mm)'
  }),

  windowTableColumnHelper.accessor((row) => row.tableEntry.fit, {
    id: 'fit',
    header: 'Fit'
  }),

  windowTableColumnHelper.accessor((row) => capitalise(row.windowDisplay.blindCount), {
    id: 'blindCount',
    header: 'Count'
  })
])
