import { windowTableColumnBase } from '@/components/windowTable/utility/columnDefinitions/defaultDefinition'
import EditableCell from '@/components/windowTable/utility/columnDefinitions/EditableCell'
import { WindowFormTableFeatures } from '@/components/windowTable/utility/features'
import { isKineticsCellularTableEntry } from '@shared/types/tableEntry/kineticsCellular.types'
import { ControlSideOption, WindowTableEntry } from '@shared/types/WindowTableForm.types'
import { createColumnHelper } from '@tanstack/react-table'
import SelectValueCell from '@/components/windowTable/utility/columnDefinitions/SelectValueCell'
import { getSelectItemList } from '@/components/windowTable/utility/columnDefinitions'
import { KineticsCellularControlOption } from '@/utility/process/tableEntry/kineticsCellular'

const columnHelper = createColumnHelper<WindowFormTableFeatures, WindowTableEntry>()

export const kineticsCellularWindowTableColumnDefinition = columnHelper.columns([
  ...windowTableColumnBase,

  columnHelper.accessor(
    (row) => {
      if (!isKineticsCellularTableEntry(row.tableEntry)) return
      return row.tableEntry.comb
    },
    {
      id: 'comb',
      header: 'Comb Size'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsCellularTableEntry(row.tableEntry)) return
      return row.tableEntry.fabric
    },
    {
      id: 'fabric',
      header: 'Fabric'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsCellularTableEntry(row.tableEntry)) return
      return row.tableEntry.control
    },
    {
      id: 'control',
      header: 'Control',
      cell: (props) => (
        <SelectValueCell
          {...props}
          selectOptions={getSelectItemList(
            props.cell.row.original.blindType,
            KineticsCellularControlOption
          )}
        />
      )
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsCellularTableEntry(row.tableEntry)) return
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
      if (!isKineticsCellularTableEntry(row.tableEntry)) return
      return row.tableEntry['headrail colour']
    },
    {
      id: 'headrail colour',
      header: 'Headrail Colour'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsCellularTableEntry(row.tableEntry)) return
      return row.tableEntry['side channel']
    },
    {
      id: 'side channel',
      header: 'Side Channel'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsCellularTableEntry(row.tableEntry)) return
      return row.tableEntry.butting
    },
    {
      id: 'butting',
      header: 'Butting'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsCellularTableEntry(row.tableEntry)) return
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
      if (!isKineticsCellularTableEntry(row.tableEntry)) return
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
      if (!isKineticsCellularTableEntry(row.tableEntry)) return
      return row.tableEntry.price
    },
    {
      id: 'price',
      header: 'Price'
    }
  )
])
