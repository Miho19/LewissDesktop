import SpecSheetContent from '@/components/spec/SpecSheetContent'
import WindowTable from '@/components/windowTable/table/_WindowTable'
import WindowTableFooter from '@/components/windowTable/table/_WindowTableFooter'
import {
  windowTableFeatures,
  windowTableColumns
} from '@/components/windowTable/table/_windowTableUtility'
import { CardContent } from '@/components/ui/card'
import { Sheet } from '@/components/ui/sheet'
import { getWindowDisplayList } from '@/utility/windowDisplay/getWindowDisplayList'
import { ProjectFile } from '@shared/types/Project.types'
import { WindowDisplay } from '@shared/types/WindowDisplay.types'
import { useTable } from '@tanstack/react-table'
import { SubmitEvent, useState } from 'react'
import { toast } from 'sonner'
import { getBlindTypeFromSpec } from '@/utility/process/worksheet/getBlindTypeFromSpec'
import { getWorksheetListAsync } from '@/utility/process/worksheet/getWorksheetList'
import { Blind } from '@shared/types/blind/blind.types'

type Props = {
  blindType: Blind
  file: ProjectFile
}

type ToastErrorOption = {
  message: string
  showToast?: boolean
}

function WindowTableForm(props: Props) {
  const { blindType, file } = props

  const [rowSelection, setRowSelection] = useState({})
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false)
  const [rowSelected, setRowSelected] = useState<WindowDisplay | undefined>(undefined)
  const [isSubmitPending, setIsSubmitPending] = useState(false)

  const windowDisplayList = getFilteredList(blindType, getWindowDisplayList(file))

  const table = useTable({
    features: windowTableFeatures,
    columns: windowTableColumns,
    data: windowDisplayList,
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection
    }
  })

  const totalSelected = table.getFilteredSelectedRowModel().rows.length
  const totalRows = table.getFilteredRowModel().rows.length

  const selectedOutputString = `${totalSelected} of ${totalRows} selected`

  function onRowClick(row: WindowDisplay) {
    setIsSheetOpen(true)
    setRowSelected(row)
  }

  function handleSpecSheetContentError({ message, showToast = true }: ToastErrorOption) {
    if (showToast) toastErrorMessage(message)

    setIsSheetOpen(false)

    return
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

  function onSubmitHandler(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <form onSubmit={onSubmitHandler}>
        <CardContent className="py-4">
          <WindowTable table={table} onRowClick={onRowClick} />
        </CardContent>
        <WindowTableFooter
          isSubmitPending={isSubmitPending}
          selectedRowsString={selectedOutputString}
        />
      </form>
      <SpecSheetContent windowTableEntry={rowSelected} errorHandler={handleSpecSheetContentError} />
    </Sheet>
  )
}

function getFilteredList(filterType: Blind, windowDisplayList: WindowDisplay[]) {
  return windowDisplayList.filter((wd) => {
    const { spec } = wd
    const blindType = getBlindTypeFromSpec(spec)
    if (typeof blindType === 'undefined') return false

    return blindType !== filterType
  })
}

function toastErrorMessage(message: string) {
  toast.error('Window Table Form', {
    id: 'window-table-form',
    description: <p className="bg-background text-foreground font-sans">{message}</p>
  })
}

function handleGetWorksheetListRejectedList(rejectedReason: any[], errorMap: Map<string, string>) {
  if (rejectedReason.length === 0) return new Map([...errorMap])

  const map = new Map<string, string>()

  for (const reason of rejectedReason) {
    if (!(reason instanceof Error)) continue
    map.set(reason.name, reason.message)
  }

  return map
}

export default WindowTableForm
