import { windowTableColumnBase } from '@/components/windowTable/utility/columnDefinitions/defaultDefinition'
import { WindowFormTableFeatures } from '@/components/windowTable/utility/features'
import { isLewissAluminiumTableEntry } from '@shared/types/tableEntry/lewissAluminium.types'
import { isLewissFauxwoodTableEntry } from '@shared/types/tableEntry/lewissFauxwood.types'
import { isLewissPhoenixwoodTableEntry } from '@shared/types/tableEntry/lewissPhoenixwood.types'

import { WindowTableEntry } from '@shared/types/WindowTableForm.types'
import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<WindowFormTableFeatures, WindowTableEntry>()

export const LewissAluminiumWindowTableColumnDefinition = columnHelper.columns([
  ...windowTableColumnBase,

  columnHelper.accessor(
    (row) => {
      if (!isLewissAluminiumTableEntry(row.tableEntry)) return
      return row.tableEntry.colour
    },
    {
      id: 'colour',
      header: 'Colour'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isLewissAluminiumTableEntry(row.tableEntry)) return
      return row.tableEntry.control
    },
    {
      id: 'control',
      header: 'Control'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isLewissAluminiumTableEntry(row.tableEntry)) return
      return row.tableEntry['control side']
    },
    {
      id: 'controlSide',
      header: 'Control Side'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isLewissAluminiumTableEntry(row.tableEntry)) return
      return row.tableEntry['tilt side']
    },
    {
      id: 'tiltSide',
      header: 'Tilt Side'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isLewissAluminiumTableEntry(row.tableEntry)) return
      return row.tableEntry['Spacer Block']
    },
    {
      id: 'spacerBlock',
      header: 'Spacer Block'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isLewissAluminiumTableEntry(row.tableEntry)) return
      return row.tableEntry.price
    },
    {
      id: 'price',
      header: 'Price'
    }
  )
])

export const LewissFauxwoodWindowTableColumnDefinition = columnHelper.columns([
  ...windowTableColumnBase,

  columnHelper.accessor(
    (row) => {
      if (!isLewissFauxwoodTableEntry(row.tableEntry)) return
      return row.tableEntry.colour
    },
    {
      id: 'colour',
      header: 'Colour'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isLewissFauxwoodTableEntry(row.tableEntry)) return
      return row.tableEntry.control
    },
    {
      id: 'control',
      header: 'Control'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isLewissFauxwoodTableEntry(row.tableEntry)) return
      return row.tableEntry['control side']
    },
    {
      id: 'controlSide',
      header: 'Control Side'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isLewissFauxwoodTableEntry(row.tableEntry)) return
      return row.tableEntry['tilt side']
    },
    {
      id: 'tiltSide',
      header: 'Tilt Side'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isLewissFauxwoodTableEntry(row.tableEntry)) return
      return row.tableEntry.valance
    },
    {
      id: 'valance',
      header: 'Valance'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isLewissFauxwoodTableEntry(row.tableEntry)) return
      return row.tableEntry.fascia
    },
    {
      id: 'fascia',
      header: 'Fascia'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isLewissFauxwoodTableEntry(row.tableEntry)) return
      return row.tableEntry['cut out']
    },
    {
      id: 'cutOut',
      header: 'Cut Out'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isLewissFauxwoodTableEntry(row.tableEntry)) return
      return row.tableEntry['palladian shelf']
    },
    {
      id: 'palladianShelf',
      header: 'Palladian Shelf'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isLewissFauxwoodTableEntry(row.tableEntry)) return
      return row.tableEntry.butting
    },
    {
      id: 'butting',
      header: 'Butting'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isLewissFauxwoodTableEntry(row.tableEntry)) return
      return row.tableEntry.price
    },
    {
      id: 'price',
      header: 'Price'
    }
  )
])

export const LewissPhoenixwoodWindowTableColumnDefinition = columnHelper.columns([
  ...windowTableColumnBase,

  columnHelper.accessor(
    (row) => {
      if (!isLewissPhoenixwoodTableEntry(row.tableEntry)) return
      return row.tableEntry.colour
    },
    {
      id: 'colour',
      header: 'Colour'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isLewissPhoenixwoodTableEntry(row.tableEntry)) return
      return row.tableEntry.control
    },
    {
      id: 'control',
      header: 'Control'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isLewissPhoenixwoodTableEntry(row.tableEntry)) return
      return row.tableEntry['control side']
    },
    {
      id: 'controlSide',
      header: 'Control Side'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isLewissPhoenixwoodTableEntry(row.tableEntry)) return
      return row.tableEntry['tilt side']
    },
    {
      id: 'tiltSide',
      header: 'Tilt Side'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isLewissPhoenixwoodTableEntry(row.tableEntry)) return
      return row.tableEntry.valance
    },
    {
      id: 'valance',
      header: 'Valance'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isLewissPhoenixwoodTableEntry(row.tableEntry)) return
      return row.tableEntry.fascia
    },
    {
      id: 'fascia',
      header: 'Fascia'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isLewissPhoenixwoodTableEntry(row.tableEntry)) return
      return row.tableEntry['cut out']
    },
    {
      id: 'cutOut',
      header: 'Cut Out'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isLewissPhoenixwoodTableEntry(row.tableEntry)) return
      return row.tableEntry['palladian shelf']
    },
    {
      id: 'palladianShelf',
      header: 'Palladian Shelf'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isLewissPhoenixwoodTableEntry(row.tableEntry)) return
      return row.tableEntry.butting
    },
    {
      id: 'butting',
      header: 'Butting'
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!isLewissPhoenixwoodTableEntry(row.tableEntry)) return
      return row.tableEntry.price
    },
    {
      id: 'price',
      header: 'Price'
    }
  )
])
