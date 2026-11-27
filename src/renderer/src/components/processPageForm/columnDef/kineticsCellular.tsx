import { processPageTableBaseColumnDef } from '@/components/processPageForm/columnDef/defaultDef'
import EditableCell from '@/components/processPageForm/columnDef/ProcessPageEditableCell'
import ProcessPageSelectValueCell from '@/components/processPageForm/columnDef/ProcessPageSelectValueCell'
import { ProcessPageTableFeatures } from '@/components/processPageForm/ProcessPageTableUtility'
import { getSelectItemList } from '@/components/windowTable/utility/columnDefinitions'

import { KineticsCellularControlOption } from '@/utility/process/tableEntry/kineticsCellular'
import { ControlSideOption } from '@shared/types/spec/Spec.types'
import { isKineticsCellularTableEntry } from '@shared/types/tableEntry/kineticsCellular.types'
import { WindowTableEntry } from '@shared/types/WindowTableEntry.types'
import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<typeof ProcessPageTableFeatures, WindowTableEntry>()

export const kineticsCellularProcessPageTableColumnDef = columnHelper.columns([
  ...processPageTableBaseColumnDef,
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
        <ProcessPageSelectValueCell
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

      return row.tableEntry.butting.slice(0, 3)
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
