import SpecSheetContent from '@/components/spec/SpecSheetContent'
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

export type ToastErrorOption = {
  message: string
  showToast?: boolean
}

function WindowTableContainer(props: Props) {
  const { file } = props
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const windowDisplayList = getWindowDisplayList(file)
  const map = getWindowDisplayListAsMap(windowDisplayList)

  if (map.size === 0) return <WindowTableContainerEmpty />

  async function submitTable(windowTableEntryList: WindowTableEntry[], file: ProjectFile) {}

  const windowTableFormList = getWindowTableFormList(map, file)

  return (
    <div className="w-full h-full flex flex-col gap-8">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <div className="flex flex-col w-full gap-16">{windowTableFormList}</div>
      </Sheet>
    </div>
  )
}

function getWindowTableFormList(map: Map<Blind, WindowDisplay[]>, file: ProjectFile) {
  return [...map.entries()].map(([key, value]) => {
    return (
      <Suspense fallback={<WindowTableLoading />} key={`${key}`}>
        <WindowFormTable blindType={key} windowDisplayList={value} file={file} />
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

export function toastWindowTableFormErrorMessage(message: string) {
  toast.error('Window Table Form', {
    id: 'window-table-form',
    description: <p className="bg-background text-foreground font-sans">{message}</p>
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
