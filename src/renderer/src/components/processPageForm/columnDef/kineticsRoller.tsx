import { processPageTableBaseColumnDef } from '@/components/processPageForm/columnDef/defaultDef'
import ProcessPageEditableCell from '@/components/processPageForm/columnDef/ProcessPageEditableCell'
import ProcessPageSelectValueCell from '@/components/processPageForm/columnDef/ProcessPageSelectValueCell'
import { ProcessPageTableFeatures } from '@/components/processPageForm/ProcessPageTableUtility'
import {
  getSelectItemList,
  getKineticsRollerBracketSelectItemList
} from '@/components/windowTable/utility/columnDefinitions'

import {
  kineticsRollerDestructureControlString,
  KineticsRollerControlOption,
  KineticsRollerChainColour,
  KineticsRollerChainLength
} from '@/utility/process/tableEntry/kineticsRoller'
import { KineticsRollerRollOption } from '@shared/types/spec/kineticsRoller.types'
import { ControlSideOption } from '@shared/types/spec/Spec.types'
import { isKineticsRollerTableEntry } from '@shared/types/tableEntry/kineticsRoller.types'
import { WindowTableEntry } from '@shared/types/WindowTableEntry.types'
import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<typeof ProcessPageTableFeatures, WindowTableEntry>()

export const kineticsRollerProcessPageTableColumnDef = columnHelper.columns([
  ...processPageTableBaseColumnDef,

  columnHelper.accessor(
    (row) => {
      if (!isKineticsRollerTableEntry(row.tableEntry)) return
      return row.tableEntry.roll
    },
    {
      id: 'roll',
      header: 'Roll',
      cell: (props) => (
        <ProcessPageSelectValueCell
          {...props}
          selectOptions={getSelectItemList(
            props.row.original.blindType,
            KineticsRollerRollOption as readonly string[]
          )}
        />
      )
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
        <ProcessPageSelectValueCell
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
        <ProcessPageSelectValueCell
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
      header: 'Control Length (mm)',
      cell: (props) => (
        <ProcessPageSelectValueCell
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
        <ProcessPageSelectValueCell
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
        <ProcessPageSelectValueCell
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
      return row.tableEntry.butting.slice(0, 3)
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
      cell: ProcessPageEditableCell
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
      cell: ProcessPageEditableCell
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
