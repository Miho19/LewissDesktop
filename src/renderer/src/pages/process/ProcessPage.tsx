import ProcessPageHeader from '@/components/processPageHeader/processPageHeader'
import ProcessPageWindowList from '@/components/processPageWindowList/ProcessPageWindowList'
import { Sheet } from '@/components/ui/sheet'
import { Spinner } from '@/components/ui/spinner'
import useProcessFile from '@/hook/useProcessFile'
import { WindowTableEntry } from '@shared/types/WindowTableEntry.types'
import { useParams } from '@tanstack/react-router'
import { useState } from 'react'

/**
 *
 * @returns
 *
 *
 * Seperate lines into blind type --> display table of window table entry -->
 * when you submit you submit the entire list
 *
 */
function ProcessPage() {
  const { fileId } = useParams({ from: '/process/$fileId' })
  const { data, isPending, isLoading, isError, error } = useProcessFile(fileId)

  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const [submitData, setSubmitData] = useState<WindowTableEntry[]>([])

  if (isPending || isLoading)
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        <Spinner />
      </div>
    )

  if (isError)
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        <h1>{error.message}</h1>
      </div>
    )

  function startProcess(windowTableEntryList: WindowTableEntry[]) {
    setSubmitData(windowTableEntryList)
    setIsSheetOpen(true)
  }

  function closeSheet() {
    setIsSheetOpen(false)
  }

  return (
    <div className="w-full h-full flex flex-col p-6 gap-8 items-center">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <ProcessPageHeader file={data} />
        <ProcessPageWindowList file={data} startProcess={startProcess} />
      </Sheet>
    </div>
  )
}

export default ProcessPage
