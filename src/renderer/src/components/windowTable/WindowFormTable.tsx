import { Marker, MarkerContent } from '@/components/ui/marker'
import { getWindowFormTableColumnDefinition } from '@/components/windowTable/utility/columnDefinitions'
import { windowFormTableFeatures } from '@/components/windowTable/utility/features'
import WindowFormTableFooter from '@/components/windowTable/WindowFormTableFooter'
import WindowTable from '@/components/windowTable/WindowTable'
import { ToastDisplayOptions } from '@/components/windowTable/WindowTableContainer'
import { getTableEntryListAsync } from '@/utility/process/tableEntry'
import { Blind } from '@shared/types/blind/blind.types'
import { ProjectFile } from '@shared/types/Project.types'
import { WindowDisplay } from '@shared/types/WindowDisplay.types'
import { WindowTableEntry } from '@shared/types/WindowTableForm.types'
import { useSuspenseQuery } from '@tanstack/react-query'
import { RowSelectionState, useTable } from '@tanstack/react-table'
import { useState } from 'react'

type Props = {
  blindType: Blind
  windowDisplayList: WindowDisplay[]
  file: ProjectFile
  openSheet: (WindowTableEntryList: WindowTableEntry[]) => void
  toastMessage: (message: string, type: ToastDisplayOptions) => void
}

function WindowFormTable(props: Props) {
  const { blindType, windowDisplayList, file, openSheet, toastMessage } = props

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const {
    data: initialTableData,
    error,
    isFetching
  } = useSuspenseQuery<WindowTableEntry[]>({
    queryKey: [`${blindType}`, `${file.reference}`],
    queryFn: async () => await getWindowTableEntryList(blindType, windowDisplayList, file)
  })

  const [data, setData] = useState(initialTableData)

  async function updateData(rowIndex: number, columnId: string, value: unknown) {
    setData((prev) => {
      return prev.map((row, index) => {
        if (index !== rowIndex) return row
        return {
          ...row,
          tableEntry: {
            ...row.tableEntry,
            [columnId]: value
          }
        }
      })
    })

    // handle update pricing of tableEntry
  }

  const table = useTable({
    features: windowFormTableFeatures,
    columns: getWindowFormTableColumnDefinition(blindType),
    data: data,
    columnResizeMode: 'onChange',
    defaultColumn: {
      size: 150,
      minSize: 50,
      maxSize: 350
    },
    meta: {
      updateData
    },
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection
    }
  })

  if (error && !isFetching) {
    throw error
  }

  const totalSelected = table.getFilteredSelectedRowModel().rows.length
  const totalRows = table.getFilteredRowModel().rows.length

  const numberOfSelectedRowsString = `${totalSelected} of ${totalRows} selected`

  async function onSubmitHandler(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const WindowTableEntryList = table.getFilteredSelectedRowModel().rows.map((row) => row.original)

    if (WindowTableEntryList.length === 0) {
      toastMessage(`No '${blindType} windows selected'`, 'error')
      return
    }

    openSheet(WindowTableEntryList)
  }

  return (
    <form className="flex flex-col w-full gap-8" onSubmit={onSubmitHandler}>
      <div className="flex w-full justify-between">
        <Marker variant={'separator'}>
          <MarkerContent>{blindType}</MarkerContent>
        </Marker>
      </div>
      <WindowTable table={table} />
      <WindowFormTableFooter numberOfSelectedRowsString={numberOfSelectedRowsString} />
    </form>
  )
}

async function getWindowTableEntryList(
  blindType: Blind,
  windowDisplayList: WindowDisplay[],
  file: ProjectFile
) {
  // breaking functional programming here but do not know another solution currently

  const entries: WindowTableEntry[] = []

  await getTableEntryListAsync(
    blindType,
    windowDisplayList,
    file,
    (blindType, windowDisplay, tableEntry) => {
      const newEntry: WindowTableEntry = {
        blindType,
        windowDisplay,
        tableEntry
      }

      entries.push(newEntry)
    }
  )

  return entries
}

export default WindowFormTable
