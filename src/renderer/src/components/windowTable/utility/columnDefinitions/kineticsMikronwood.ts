import { windowTableColumnBase } from '@/components/windowTable/utility/columnDefinitions/defaultDefinition'
import EditableCell from '@/components/windowTable/utility/columnDefinitions/EditableCell'
import { WindowFormTableFeatures } from '@/components/windowTable/utility/features'
import { isKineticsMikronwoodTableEntry } from '@shared/types/tableEntry/kineticsMikronwood.types'
import { WindowTableEntry } from '@shared/types/WindowTableForm.types'
import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<WindowFormTableFeatures, WindowTableEntry>()

export const kineticsMikronwoodWindowTableColumnDefinition = columnHelper.columns([
  ...windowTableColumnBase,

  columnHelper.accessor(
    (row) => {
      if (!isKineticsMikronwoodTableEntry(row.tableEntry)) return
      return row.tableEntry.colour
    },
    {
      id: 'colour',
      header: 'Colour'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsMikronwoodTableEntry(row.tableEntry)) return
      return row.tableEntry.control
    },
    {
      id: 'control',
      header: 'Control'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsMikronwoodTableEntry(row.tableEntry)) return
      return row.tableEntry['control side']
    },
    {
      id: 'controlSide',
      header: 'Control Side'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsMikronwoodTableEntry(row.tableEntry)) return
      return row.tableEntry['tilt side']
    },
    {
      id: 'tiltSide',
      header: 'Tilt Side'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsMikronwoodTableEntry(row.tableEntry)) return
      return row.tableEntry.fascia
    },
    {
      id: 'fascia',
      header: 'Fascia'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsMikronwoodTableEntry(row.tableEntry)) return
      return row.tableEntry['hold down bracket']
    },
    {
      id: 'holdDownBracket',
      header: 'Hold Down Bracket'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsMikronwoodTableEntry(row.tableEntry)) return
      return row.tableEntry.butting
    },
    {
      id: 'butting',
      header: 'Butting'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isKineticsMikronwoodTableEntry(row.tableEntry)) return
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
      if (!isKineticsMikronwoodTableEntry(row.tableEntry)) return
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
      if (!isKineticsMikronwoodTableEntry(row.tableEntry)) return
      return row.tableEntry.price
    },
    {
      id: 'price',
      header: 'Price'
    }
  )
])
