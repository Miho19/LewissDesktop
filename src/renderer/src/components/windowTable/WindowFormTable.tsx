import { Marker, MarkerContent } from '@/components/ui/marker'
import { getWindowFormTableColumnDefinition } from '@/components/windowTable/utility/columnDefinitions'
import { editableDefaultColumnId } from '@/components/windowTable/utility/columnDefinitions/defaultDefinition'
import { windowFormTableFeatures } from '@/components/windowTable/utility/features'
import WindowFormTableFooter from '@/components/windowTable/WindowFormTableFooter'
import WindowTable from '@/components/windowTable/WindowTable'
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
}

function WindowFormTable(props: Props) {
  const { blindType, windowDisplayList, file, openSheet } = props

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const {
    data: initialTableData,
    error,
    isFetching
  } = useSuspenseQuery<WindowTableEntry[]>({
    queryKey: [`${blindType} initial window table form`],
    queryFn: async () => await getWindowTableEntryList(blindType, windowDisplayList, file)
  })

  const [data, setData] = useState(initialTableData)

  const table = useTable({
    features: windowFormTableFeatures,
    columns: getWindowFormTableColumnDefinition(blindType),
    data: data,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((prev) => {
          return prev.map((row, index) => {
            if (index !== rowIndex) return row

            if (editableDefaultColumnId.includes(columnId)) {
              return {
                ...row,
                windowDisplay: {
                  ...row.windowDisplay,
                  [columnId]: value
                }
              }
            }

            return {
              ...row,
              tableEntry: {
                ...row.tableEntry,
                [columnId]: value
              }
            }
          })
        })
      }
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
      toastErrorMessage(`No '${blindType} windows selected'`)
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

function toastErrorMessage(arg0: string) {
  throw new Error('Function not implemented.')
}
// async function onSubmitHandler(event: SubmitEvent<HTMLFormElement>) {
//   event.preventDefault()
//   if (isSubmitPending) return
//   if (typeof windowDisplayList === 'undefined') return

//   if (table.getFilteredSelectedRowModel().rows.length === 0) {
//     toastErrorMessage('No rows selected')
//     return
//   }

//   let errorMap = new Map<string, string>()

//   try {
//     setIsSubmitPending(true)
//     const selectedWindows = table.getFilteredSelectedRowModel().rows.map((row) => row.original)

//     const [worksheetList, rejectedReasons] = await getWorksheetListAsync(selectedWindows, file)
//     errorMap = handleGetWorksheetListRejectedList(rejectedReasons, errorMap)

//     console.log(worksheetList)
//   } catch (error) {
//     if (error instanceof Error) {
//       errorMap.set(error.name, error.message)
//     }
//   } finally {
//     setIsSubmitPending(false)
//     if (errorMap.size === 0) return

//     for (const [key, value] of errorMap) {
//       toastErrorMessage(`${key}\n${value}`)
//     }
//   }
// }
