import { ProcessTableRefHandler } from '@/components/processPageForm/ProcessPageForm'
import {
  ProcessPageTableColumn,
  ProcessPageTableFeatures
} from '@/components/processPageForm/ProcessPageTableUtility'
import { Marker, MarkerContent } from '@/components/ui/marker'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { getWindowTableEntryListAsync } from '@/utility/process/windowTableEntry/getWindowTableEntryList'
import { Blind } from '@shared/types/blind/blind.types'
import { Line, ProcessFile } from '@shared/types/process/Process.types'
import { WindowTableEntry } from '@shared/types/WindowTableEntry.types'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ReactTable, useTable } from '@tanstack/react-table'
import { useImperativeHandle, useState } from 'react'

type Props = {
  blindType: Blind
  lineList: Line[]
  file: ProcessFile
  ref?: React.Ref<ProcessTableRefHandler>
}

function ProcessPageTable(props: Props) {
  const { blindType, lineList, file, ref } = props

  const {
    data: initialTableData,
    error,
    isFetching
  } = useSuspenseQuery<WindowTableEntry[]>({
    queryKey: ['process file window table entry list', blindType, file.scheduleRef],
    queryFn: async () => await getWindowTableEntryListAsync(blindType, lineList, file)
  })

  const [data, setData] = useState<WindowTableEntry[]>(initialTableData)

  useImperativeHandle(ref, () => ({
    getData() {
      return data
    }
  }))

  const table = useTable({
    features: ProcessPageTableFeatures,
    columns: ProcessPageTableColumn,
    data: data,
    columnResizeMode: 'onChange',
    defaultColumn: {
      size: 150,
      minSize: 50,
      maxSize: 350
    }
  })

  if (error && !isFetching) {
    throw error
  }

  const headerList = getTableHeader(table)
  const bodyList = getTableBody(table)

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex w-full justify-between">
        <Marker variant={'separator'}>
          <MarkerContent>{blindType}</MarkerContent>
        </Marker>
      </div>
      <ScrollArea className="rounded-md border min-h-0">
        <Table nowrapper className="table-auto" style={{ width: table.getCenterTotalSize() }}>
          <TableHeader className="sticky top-0 z-10 bg-background shadow-xs">
            {headerList}
          </TableHeader>
          <TableBody>{bodyList}</TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

function getTableBody(table: ReactTable<typeof ProcessPageTableFeatures, WindowTableEntry>) {
  if (table.getRowModel().rows.length === 0)
    return (
      <TableRow>
        <TableCell colSpan={table.getAllColumns().length} className="text-center">
          No windows
        </TableCell>
      </TableRow>
    )

  const bodyList = table.getRowModel().rows.map((row) => {
    return (
      <TableRow
        key={row.id}

        className="cursor-pointer hover:bg-muted/50 transition-colors"
      >
        {row.getAllCells().map((cell) => {
          return (
            <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
              <table.FlexRender cell={cell} />
            </TableCell>
          )
        })}
      </TableRow>
    )
  })

  return bodyList
}

function getTableHeader(table: ReactTable<typeof ProcessPageTableFeatures, WindowTableEntry>) {
  const headerList = table.getHeaderGroups().map((headerGroup) => {
    return (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
          return (
            <TableHead
              key={header.id}
              style={{ width: header.getSize() }}
              className="relative group"
            >
              {header.isPlaceholder ? null : <table.FlexRender header={header} />}
              <div
                onMouseDown={header.getResizeHandler()}
                onTouchStart={header.getResizeHandler()}
                className={`absolute right-0 top-0 h-full w-1 cursor-col-resize bg-border select-none touch-none opacity-0 group-hover:opacity-100 transition-opacity ${
                  header.column.getIsResizing() ? 'bg-primary opacity-100 w-1.5' : ''
                }`}
              ></div>
            </TableHead>
          )
        })}
      </TableRow>
    )
  })

  return headerList
}

export default ProcessPageTable
