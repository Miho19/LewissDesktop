import { WindowTableEntry } from '@shared/types/WindowTableForm.types'
import { createColumnHelper } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'

import { WindowFormTableFeatures } from '@/components/windowTable/utility/features'
import EditableCell from '@/components/windowTable/utility/columnDefinitions/EditableCell'

export const windowTableColumnHelper = createColumnHelper<
  WindowFormTableFeatures,
  WindowTableEntry
>()

export const windowTableColumnBase = windowTableColumnHelper.columns([
  windowTableColumnHelper.display({
    size: 50,
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

  windowTableColumnHelper.accessor((row) => row.tableEntry.location, {
    size: 250,
    minSize: 200,
    maxSize: 350,
    id: 'location',
    header: 'Location',
    cell: EditableCell
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
  })
])
