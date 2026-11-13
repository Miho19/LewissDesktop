import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { FolderItem } from '@shared/types/Folder.types'
import { ColumnDef, ReactTable, tableFeatures, useTable } from '@tanstack/react-table'

const features = tableFeatures({})

const columns: ColumnDef<typeof features, FolderItem>[] = []

function SearchInvoiceTable() {
  const data = []

  const table = useTable({
    key: 'search-invoice-table',
    features,
    columns,
    data
  })

  return (
    <Table>
      <TableHeader>{getTableHeader(table)}</TableHeader>
      <TableBody>{getTableBody(table)}</TableBody>
    </Table>
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
