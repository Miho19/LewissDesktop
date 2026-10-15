import SubmitSheet from '@/components/submitSheet/SubmitSheet'
import { Sheet } from '@/components/ui/sheet'
import { Spinner } from '@/components/ui/spinner'
import WindowFormTable from '@/components/windowTable/WindowFormTable'
import { getWindowDisplayListAsMap } from '@/utility/process/worksheet/getWorksheetList'
import { getWindowDisplayList } from '@/utility/windowDisplay/getWindowDisplayList'
import { Blind } from '@shared/types/blind/blind.types'
import { ProjectFile } from '@shared/types/Project.types'
import { WindowDisplay } from '@shared/types/WindowDisplay.types'
import { WindowTableEntry } from '@shared/types/WindowTableForm.types'
import { Suspense, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  file: ProjectFile
}

export type ToastDisplayOptions = 'error' | 'success' | 'info'

export type ToastErrorOption = {
  message: string
  showToast?: boolean
  type?: ToastDisplayOptions
}

function WindowTableContainer(props: Props) {
  const { file } = props
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [submitData, setSubmitData] = useState<WindowTableEntry[]>([])

  const windowDisplayList = getWindowDisplayList(file)
  const map = getWindowDisplayListAsMap(windowDisplayList)

  if (map.size === 0) return <WindowTableContainerEmpty />

  function openSheet(windowTableEntry: WindowTableEntry[]) {
    setSubmitData(windowTableEntry)
    setIsSheetOpen(true)
  }

  function closeSheet() {
    setIsSheetOpen(false)
  }

  const windowTableFormList = getWindowTableFormList(map, file, openSheet)

  return (
    <div className="w-full h-full flex flex-col gap-8">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <div className="flex flex-col w-full gap-16">{windowTableFormList}</div>
        <SubmitSheet
          windowTableEntryList={submitData}
          showToast={toastWindowTableForm}
          closeSheet={closeSheet}
          file={file}
        />
      </Sheet>
    </div>
  )
}

function getWindowTableFormList(
  map: Map<Blind, WindowDisplay[]>,
  file: ProjectFile,
  openSheet: (WindowTableEntryList: WindowTableEntry[]) => void
) {
  return [...map.entries()].map(([key, value]) => {
    return (
      <Suspense fallback={<WindowTableLoading />} key={`${key}${file.id}`}>
        <WindowFormTable
          blindType={key}
          windowDisplayList={value}
          file={file}
          openSheet={openSheet}
          toastMessage={toastWindowTableForm}
        />
      </Suspense>
    )
  })
}

function WindowTableContainerEmpty() {
  return (
    <div className="w-full h-full flex flex-col gap-8">
      <p className="text-center">No windows to process</p>
    </div>
  )
}

export function toastWindowTableForm(message: string, type: ToastDisplayOptions) {
  const name = 'Window Table Form'
  const id = 'window-table-form'

  function getDescription(message: string) {
    return <p className="bg-background text-foreground font-sans">{message}</p>
  }

  const sonnerMap = {
    error: toast.error,
    success: toast.success,
    info: toast.info
  }

  const toastFunction = sonnerMap[type] ?? toast
  toastFunction(name, {
    id,
    description: getDescription(message)
  })
}

function WindowTableLoading() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <Spinner />
    </div>
  )
}

export default WindowTableContainer
