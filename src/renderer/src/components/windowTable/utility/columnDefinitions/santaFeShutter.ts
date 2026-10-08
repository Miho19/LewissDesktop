import { windowTableColumnBase } from '@/components/windowTable/utility/columnDefinitions/defaultDefinition'
import { WindowFormTableFeatures } from '@/components/windowTable/utility/features'
import { isSantaFeShutterTableEntry } from '@shared/types/tableEntry/santaFeShutter.types'

import { WindowTableEntry } from '@shared/types/WindowTableForm.types'
import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<WindowFormTableFeatures, WindowTableEntry>()

export const SantaFeShutterWindowTableColumnDefinition = columnHelper.columns([
  ...windowTableColumnBase,

  columnHelper.accessor(
    (row) => {
      if (!isSantaFeShutterTableEntry(row.tableEntry)) return
      return row.tableEntry.colour
    },
    {
      id: 'colour',
      header: 'Colour'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isSantaFeShutterTableEntry(row.tableEntry)) return
      return row.tableEntry.control
    },
    {
      id: 'control',
      header: 'Control'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isSantaFeShutterTableEntry(row.tableEntry)) return
      return row.tableEntry['control side']
    },
    {
      id: 'controlSide',
      header: 'Control Side'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isSantaFeShutterTableEntry(row.tableEntry)) return
      return row.tableEntry.track
    },
    {
      id: 'track',
      header: 'Track'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isSantaFeShutterTableEntry(row.tableEntry)) return
      return row.tableEntry['shutter pole']
    },
    {
      id: 'shutterPole',
      header: 'Shutter Pole'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isSantaFeShutterTableEntry(row.tableEntry)) return
      return row.tableEntry['flush bolt']
    },
    {
      id: 'flushBolt',
      header: 'Flush Bolt'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isSantaFeShutterTableEntry(row.tableEntry)) return
      return row.tableEntry.price
    },
    {
      id: 'price',
      header: 'Price'
    }
  )
])
