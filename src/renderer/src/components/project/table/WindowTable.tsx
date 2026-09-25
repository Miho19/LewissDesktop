import { WindowTableFeatures } from '@/components/project/table/windowTableUtility'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { WindowDisplay } from '@shared/types/WindowDisplay.types'
import { ReactTable } from '@tanstack/react-table'

type Props = {
  table: ReactTable<WindowTableFeatures, WindowDisplay>
  onRowClick: (row: WindowDisplay) => void
}

function WindowTable(props: Props) {
  const { table, onRowClick } = props

  const headerList = getTableHeader(table)

  const bodyList = getTableBody(table, onRowClick)

  return (
    <ScrollArea className="h-[512px] w-full rounded-md border">
      <Table nowrapper className="mr-6">
        <TableHeader className="sticky top-0 z-10 bg-background shadow-xs">
          {headerList}
        </TableHeader>
        <TableBody>{bodyList}</TableBody>
      </Table>
    </ScrollArea>
  )
}

function getTableBody(
  table: ReactTable<WindowTableFeatures, WindowDisplay>,
  onClick: (row: WindowDisplay) => void
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

function getTableHeader(table: ReactTable<WindowTableFeatures, WindowDisplay>) {
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
