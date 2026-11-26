import { FileListTableFeatures } from '@/components/fileList/FileListTableUtility'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { FolderItem } from '@shared/types/Folder.types'
import { ReactTable } from '@tanstack/react-table'

type Props = {
  table: ReactTable<typeof FileListTableFeatures, FolderItem>
  rowOnClick: (fileId: string) => void
}

function FileListTable(props: Props) {
  const { table, rowOnClick } = props

  return (
    <div className="w-full rounded-md border">
      <Table className="w-full table-fixed">
        <TableHeader>{getTableHeader(table)}</TableHeader>
        <TableBody>{getTableBody(table, rowOnClick)}</TableBody>
      </Table>
    </div>
  )
}

function getTableHeader(table: ReactTable<typeof FileListTableFeatures, FolderItem>) {
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

function getTableBody(
  table: ReactTable<typeof FileListTableFeatures, FolderItem>,
  rowOnClick: (fileId: string) => void
) {
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
      <TableRow
        key={row.id}
        className="cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => rowOnClick(row.original.id)}
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

export default FileListTable
