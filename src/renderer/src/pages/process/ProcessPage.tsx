import ProcessPageHeader from '@/components/processPageHeader/processPageHeader'
import { Spinner } from '@/components/ui/spinner'
import useProcessFile from '@/hook/useProcessFile'
import { useParams } from '@tanstack/react-router'

function ProcessPage() {
  const { fileId } = useParams({ from: '/process/$fileId' })
  const { data, isPending, isLoading, isError, error } = useProcessFile(fileId)

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

  return (
    <div className="w-full h-full flex flex-col p-6 gap-8 items-center">
      <ProcessPageHeader file={data} />
    </div>
  )
}

export default ProcessPage
