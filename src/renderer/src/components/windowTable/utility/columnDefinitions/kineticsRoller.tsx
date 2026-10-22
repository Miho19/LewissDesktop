import { windowTableColumnBase } from '@/components/windowTable/utility/columnDefinitions/defaultDefinition'
import EditableCell from '@/components/windowTable/utility/columnDefinitions/EditableCell'
import SelectValueCell from '@/components/windowTable/utility/columnDefinitions/SelectValueCell'
import { WindowFormTableFeatures } from '@/components/windowTable/utility/features'
import { isKineticsRollerTableEntry } from '@shared/types/tableEntry/kineticsRoller.types'
import {
  ControlSideOption,
  kineticsRollerBracketOption,
  WindowTableEntry
} from '@shared/types/WindowTableForm.types'
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
      size: 200,
      minSize: 150,
      maxSize: 300,
      id: 'control',
      header: 'Control',
      cell: EditableCell
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsRollerTableEntry(row.tableEntry)) return
      return row.tableEntry['control side']
    },
    {
      id: 'control side',
      header: 'Control Side',
      cell: (props) => (
        <SelectValueCell {...props} validOptions={ControlSideOption as readonly string[]} />
      )
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsRollerTableEntry(row.tableEntry)) return
      return row.tableEntry['bottom rail']
    },
    {
      id: 'bottom rail',
      header: 'Bottom Rail'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsRollerTableEntry(row.tableEntry)) return
      return row.tableEntry.bracket
    },
    {
      size: 200,
      minSize: 150,
      maxSize: 250,
      id: 'bracket',
      header: 'Bracket',
      cell: (props) => (
        <SelectValueCell
          {...props}
          validOptions={kineticsRollerBracketOption as readonly string[]}
        />
      )
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
