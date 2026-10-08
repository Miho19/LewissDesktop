import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { WindowFormTableFeatures } from '@/components/windowTable/utility/features'

import { WindowTableEntry } from '@shared/types/WindowTableForm.types'
import { ReactTable } from '@tanstack/react-table'

type Props = {
  table: ReactTable<WindowFormTableFeatures, WindowTableEntry>
  onRowClickHandler: (row: WindowTableEntry) => void
  tableFooter: React.ReactElement
}

function WindowTable(props: Props) {
  const { table, onRowClickHandler, tableFooter } = props

  const headerList = getTableHeader(table)

  const bodyList = getTableBody(table, onRowClickHandler)

  return (
    <ScrollArea className="min-h-36 max-h-128  rounded-md border">
      <Table nowrapper className="mr-6">
        <TableHeader className="sticky top-0 z-10 bg-background shadow-xs">
          {headerList}
        </TableHeader>
        <TableBody>{bodyList}</TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

function getTableBody(
  table: ReactTable<WindowFormTableFeatures, WindowTableEntry>,
  onClick: (row: WindowTableEntry) => void
) {
  if (table.getRowModel().rows.length === 0)
    return (
      <TableRow>
        <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
          No windows
        </TableCell>
      </TableRow>
    )

  const bodyList = table.getRowModel().rows.map((row) => {
    return (
      <TableRow
        key={row.id}
        data-state={row.getIsSelected() && 'selected'}
        className="cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => onClick(row.original)}
      >
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

function getTableHeader(table: ReactTable<WindowFormTableFeatures, WindowTableEntry>) {
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

export default WindowTable
