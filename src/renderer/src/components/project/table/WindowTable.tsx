import { WindowTableFeatures } from '@/components/project/table/windowTableUtility'
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
}

function WindowTable(props: Props) {
  const { table } = props

  const headerList = getTableHeader(table)

  const bodyList = getTableBody(table)

  return (
    <Table>
      <TableHeader>{headerList}</TableHeader>
      <TableBody>{bodyList}</TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="text-right" colSpan={table.getAllColumns().length}>
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} selected
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

function getTableBody(table: ReactTable<WindowTableFeatures, WindowDisplay>) {
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
      <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
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
