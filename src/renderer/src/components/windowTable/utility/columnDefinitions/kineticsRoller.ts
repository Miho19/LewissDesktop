import { windowTableColumnBase } from '@/components/windowTable/utility/columnDefinitions/defaultDefinition'
import EditableCell from '@/components/windowTable/utility/columnDefinitions/EditableCell'
import { WindowFormTableFeatures } from '@/components/windowTable/utility/features'
import { isKineticsRollerTableEntry } from '@shared/types/tableEntry/kineticsRoller.types'
import { WindowTableEntry } from '@shared/types/WindowTableForm.types'
import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<WindowFormTableFeatures, WindowTableEntry>()

export const kineticsRollerWindowTableColumnDefinition = columnHelper.columns([
  ...windowTableColumnBase,

  columnHelper.accessor(
    (row) => {
      if (!isKineticsRollerTableEntry(row.tableEntry)) return
      return row.tableEntry.roll
    },
    {
      id: 'roll',
      header: 'Roll'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsRollerTableEntry(row.tableEntry)) return
      return row.tableEntry.fabric
    },
    {
      id: 'fabric',
      header: 'Fabric'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsRollerTableEntry(row.tableEntry)) return
      return row.tableEntry.control
    },
    {
      id: 'control',
      header: 'Control'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsRollerTableEntry(row.tableEntry)) return
      return row.tableEntry['control side']
    },
    {
      id: 'controlSide',
      header: 'Control Side'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsRollerTableEntry(row.tableEntry)) return
      return row.tableEntry['bottom rail']
    },
    {
      id: 'bottomRail',
      header: 'Bottom Rail'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsRollerTableEntry(row.tableEntry)) return
      return row.tableEntry.bracket
    },
    {
      id: 'bracket',
      header: 'Bracket'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsRollerTableEntry(row.tableEntry)) return
      return row.tableEntry.pelmet
    },
    {
      id: 'pelmet',
      header: 'Pelmet'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsRollerTableEntry(row.tableEntry)) return
      return row.tableEntry.butting
    },
    {
      id: 'butting',
      header: 'Butting'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsRollerTableEntry(row.tableEntry)) return
      return row.tableEntry.remote
    },
    {
      id: 'remote',
      header: 'Remote',
      cell: EditableCell
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsRollerTableEntry(row.tableEntry)) return
      return row.tableEntry.channel
    },
    {
      id: 'channel',
      header: 'Channel',
      cell: EditableCell
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsRollerTableEntry(row.tableEntry)) return
      return row.tableEntry.price
    },
    {
      id: 'price',
      header: 'Price'
    }
  )
])
