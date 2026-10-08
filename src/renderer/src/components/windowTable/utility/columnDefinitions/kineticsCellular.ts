import { windowTableColumnBase } from '@/components/windowTable/utility/columnDefinitions/defaultDefinition'
import { WindowFormTableFeatures } from '@/components/windowTable/utility/features'
import { isKineticsCellularTableEntry } from '@shared/types/tableEntry/kineticsCellular.types'
import { WindowTableEntry } from '@shared/types/WindowTableForm.types'
import { createColumnHelper } from '@tanstack/react-table'

export const columnHelper = createColumnHelper<WindowFormTableFeatures, WindowTableEntry>()

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
      header: 'Control'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsCellularTableEntry(row.tableEntry)) return
      return row.tableEntry['control side']
    },
    {
      id: 'controlSide',
      header: 'Control Side'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsCellularTableEntry(row.tableEntry)) return
      return row.tableEntry['headrail colour']
    },
    {
      id: 'headrailColour',
      header: 'Headrail Colour'
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
      header: 'Remote'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsCellularTableEntry(row.tableEntry)) return
      return row.tableEntry.channel
    },
    {
      id: 'channel',
      header: 'Channel'
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
