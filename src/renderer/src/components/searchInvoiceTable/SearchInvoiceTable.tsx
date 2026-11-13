import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import useFolder from '@/hook/useFolder'
import { getLastModifiedFormatted } from '@/utility/general/getLastModifiedFormatted'
import { FolderItem } from '@shared/types/Folder.types'
import {
  columnFilteringFeature,
  createColumnHelper,
  createFilteredRowModel,
  createSortedRowModel,
  filterFn_includesString,
  filterFn_inNumberRange,
  ReactTable,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
  useTable
} from '@tanstack/react-table'
import { useMemo } from 'react'

import { toast } from 'sonner'

const features = tableFeatures({
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

const columnHelper = createColumnHelper<typeof features, FolderItem>()

function splitFileName(fileName: string) {
  if (!fileName) throw new Error(`Invalid file name`)
  const split = fileName
    .replace('.json', '')
    .split('-')
    .map((s) => s.trim())
  if (split.length !== 3) throw new Error(`${fileName} is invalid shape`)
  return { customerNumber: split[0], invoiceNumber: split[1], customerName: split[2] }
}

const columns = columnHelper.columns([
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

const pricingScheduleFolderId = '01VFVMOAGDZWNVJR6FLFDJXTBKZNOWGLNC'

function SearchInvoiceTable() {
  const { data, isPending, isLoading, isError, error } = useFolder(pricingScheduleFolderId)

  const invoiceOnlyList: FolderItem[] = useMemo(() => {
    if (!data) return []
    return data.filter((d) => d.isFile && d.name.endsWith('.json'))
  }, [data])

  const table = useTable({
    features,
    columns,
    data: invoiceOnlyList,
    initialState: {
      sorting: [{ id: 'lastModified', desc: true }]
    }
  })

  if (isPending || isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (isError) {
    toast.error(error.message)
    return <div className="w-full"></div>
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <FieldSet>
        <FieldLegend>Pricing Schedule</FieldLegend>
        <FieldDescription>Select to process</FieldDescription>
        <FieldGroup>
          <div className="flex flex-col md:grid grid-cols-3 gap-4">
            <Field>
              <FieldLabel htmlFor="customerName">Customer Name</FieldLabel>
              <Input
                placeholder="Filter customer name"
                value={(table.getColumn('customerName')?.getFilterValue() as string) ?? ''}
                onChange={(event) =>
                  table.getColumn('customerName')?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
                id="customerName"
                name="customerName"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="customerNumber">Customer Number</FieldLabel>
              <Input
                placeholder="Filter customer number"
                value={(table.getColumn('customerNumber')?.getFilterValue() as string) ?? ''}
                onChange={(event) =>
                  table.getColumn('customerNumber')?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
                id="customerNumber"
                name="customerNumber"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="invoiceNumber">Invoice Number</FieldLabel>
              <Input
                placeholder="Filter invoice number"
                value={(table.getColumn('invoiceNumber')?.getFilterValue() as string) ?? ''}
                onChange={(event) =>
                  table.getColumn('invoiceNumber')?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
                id="invoiceNumber"
                name="invoiceNumber"
              />
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>

      <div className="w-full rounded-md border">
        <Table>
          <TableHeader>{getTableHeader(table)}</TableHeader>
          <TableBody>{getTableBody(table)}</TableBody>
        </Table>
      </div>
    </div>
  )
}

function getTableHeader(table: ReactTable<typeof features, FolderItem>) {
  const headerList = table.getHeaderGroups().map((headerGroup) => {
    return (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
          return (
            <TableHead key={header.id}>
              {header.isPlaceholder ? null : <table.FlexRender header={header} />}
            </TableHead>
          )
        })}
      </TableRow>
    )
  })

  return headerList
}

function getTableBody(table: ReactTable<typeof features, FolderItem>) {
  if (table.getRowModel().rows.length === 0)
    return (
      <TableRow>
        <TableCell colSpan={table.getAllColumns().length} className="text-center">
          No results
        </TableCell>
      </TableRow>
    )

  const bodyList = table.getRowModel().rows.map((row) => {
    return (
      <TableRow key={row.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
        {row.getAllCells().map((cell) => {
          return (
            <TableCell key={cell.id}>
              <table.FlexRender cell={cell} />
            </TableCell>
          )
        })}
      </TableRow>
    )
  })

  return bodyList
}

export default SearchInvoiceTable
