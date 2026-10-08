import { useParams } from '@tanstack/react-router'
import { Spinner } from '@/components/ui/spinner'
import useProjectFile from '@/hook/useProjectFile'
import ProjectPageHeader from '@/components/projectPageHeader/ProjectPageHeader'
import WindowTableContainer from '@/components/windowTable/WindowTableContainer'
import { ScrollArea } from '@/components/ui/scroll-area'

function Project() {
  const { consultantName, projectId } = useParams({
    from: '/consultant/$consultantName/project/$projectId'
  })

  const { data: file, isPending, isLoading, isError, error } = useProjectFile(projectId)

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
    <div className="h-full w-full flex flex-col gap-8">
      <ProjectPageHeader
        name={file.name}
        reference={file.reference}
        service={file.service}
        pricingType={file.pricingType}
        consultantName={consultantName}
      />
      <WindowTableContainer file={file} />
    </div>
  )
}

export default Project
