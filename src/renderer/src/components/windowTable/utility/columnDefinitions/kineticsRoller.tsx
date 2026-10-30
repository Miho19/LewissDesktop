import {
  getKineticsRollerBracketSelectItemList,
  getSelectItemList
} from '@/components/windowTable/utility/columnDefinitions'
import { windowTableColumnBase } from '@/components/windowTable/utility/columnDefinitions/defaultDefinition'
import EditableCell from '@/components/windowTable/utility/columnDefinitions/EditableCell'
import SelectValueCell from '@/components/windowTable/utility/columnDefinitions/SelectValueCell'
import { WindowFormTableFeatures } from '@/components/windowTable/utility/features'
import {
  KineticsRollerChainColour,
  KineticsRollerChainLength,
  KineticsRollerControlOption,
  kineticsRollerDestructureControlString
} from '@/utility/process/tableEntry/kineticsRoller'
import { isKineticsRollerTableEntry } from '@shared/types/tableEntry/kineticsRoller.types'
import { ControlSideOption, WindowTableEntry } from '@shared/types/WindowTableForm.types'
import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<WindowFormTableFeatures, WindowTableEntry>()

export const kineticsRollerControlSplitName = [
  'controlType',
  'controlColour',
  'controlLength'
] as const

export type KineticsRollerControlSplitType = (typeof kineticsRollerControlSplitName)[number]

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
      const controlString = row.tableEntry.control
      const controlObject = kineticsRollerDestructureControlString(controlString)
      if (typeof controlObject === 'undefined') return 'error'
      const { type } = controlObject
      return type
    },
    {
      size: 200,
      minSize: 150,
      maxSize: 300,
      id: 'controlType',
      header: 'Control Type',
      cell: (props) => (
        <SelectValueCell
          {...props}
          selectOptions={getSelectItemList(
            props.cell.row.original.blindType,
            KineticsRollerControlOption as readonly string[]
          )}
        />
      )
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsRollerTableEntry(row.tableEntry)) return
      const controlString = row.tableEntry.control
      const controlObject = kineticsRollerDestructureControlString(controlString)
      if (typeof controlObject === 'undefined') return 'error'
      const { colour } = controlObject
      return colour
    },
    {
      size: 200,
      minSize: 150,
      maxSize: 300,
      id: 'controlColour',
      header: 'Control Colour',
      cell: (props) => (
        <SelectValueCell
          {...props}
          selectOptions={getSelectItemList(
            props.cell.row.original.blindType,
            KineticsRollerChainColour as readonly string[]
          )}
        />
      )
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsRollerTableEntry(row.tableEntry)) return
      const controlString = row.tableEntry.control
      const controlObject = kineticsRollerDestructureControlString(controlString)
      if (typeof controlObject === 'undefined') return 'error'
      const { length } = controlObject
      return length
    },
    {
      size: 200,
      minSize: 150,
      maxSize: 300,
      id: 'controlLength',
      header: 'Control Length',
      cell: (props) => (
        <SelectValueCell
          {...props}
          selectOptions={getSelectItemList(
            props.cell.row.original.blindType,
            KineticsRollerChainLength as readonly string[]
          )}
        />
      )
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
        <SelectValueCell
          {...props}
          selectOptions={getSelectItemList(
            props.cell.row.original.blindType,
            ControlSideOption as readonly string[]
          )}
        />
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
          selectOptions={getKineticsRollerBracketSelectItemList(props.cell.row.original.blindType)}
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
