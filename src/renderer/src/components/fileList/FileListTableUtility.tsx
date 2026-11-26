import { getLastModifiedFormatted } from '@/utility/general/getLastModifiedFormatted'
import { FolderItem } from '@shared/types/Folder.types'
import {
  tableFeatures,
  columnFilteringFeature,
  createFilteredRowModel,
  filterFn_includesString,
  filterFn_inNumberRange,
  rowSortingFeature,
  createSortedRowModel,
  sortFn_alphanumeric,
  sortFn_text,
  sortFn_datetime,
  createColumnHelper
} from '@tanstack/react-table'

export const FileListTableFeatures = tableFeatures({
  columnFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
  filterFns: {
    includesString: filterFn_includesString,
    inNumberRange: filterFn_inNumberRange
  },
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    text: sortFn_text,
    datetime: sortFn_datetime
  }
})

const columnHelper = createColumnHelper<typeof FileListTableFeatures, FolderItem>()

function splitFileName(fileName: string) {
  if (!fileName) throw new Error(`Invalid file name`)
  const split = fileName
    .replace('.json', '')
    .split('-')
    .map((s) => s.trim())
  if (split.length !== 3) throw new Error(`${fileName} is invalid shape`)
  return { customerNumber: split[0], invoiceNumber: split[1], customerName: split[2] }
}

export const FileTableColumn = columnHelper.columns([
  columnHelper.accessor(
    (row) => {
      const { customerName } = splitFileName(row.name)
      return customerName
    },
    {
      id: 'customerName',
      header: 'Name',
      sortFn: 'alphanumeric'
    }
  ),

  columnHelper.accessor(
    (row) => {
      const { customerNumber } = splitFileName(row.name)
      return customerNumber
    },
    {
      id: 'customerNumber',
      header: 'Customer Number',
      sortFn: 'alphanumeric'
    }
  ),

  columnHelper.accessor(
    (row) => {
      const { invoiceNumber } = splitFileName(row.name)
      return invoiceNumber
    },
    {
      id: 'invoiceNumber',
      header: 'Invoice Number',
      sortFn: 'alphanumeric'
    }
  ),

  columnHelper.accessor((row) => getLastModifiedFormatted(row.lastModified), {
    id: 'lastModified',
    header: 'Last Modified',
    sortFn: (rowA, rowB) => {
      const a: Date = new Date(rowA.original.lastModified)
      const b: Date = new Date(rowB.original.lastModified)

      return a.getTime() - b.getTime()
    }
  })
])
