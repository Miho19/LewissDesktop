import { useParams } from '@tanstack/react-router'

import { Spinner } from '@/components/ui/spinner'
import useProjectFile from '@/hook/useProjectFile'
import ProjectPageHeader from '@/components/project/ProjectPageHeader'
import { getWindowDisplayList } from '@/utility/windowDisplay/getWindowDisplayList'

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

  const windowDisplayList = getWindowDisplayList(file)

  return (
    <div className="w-full h-full flex flex-col p-6 gap-8">
      <ProjectPageHeader
        name={file.name}
        reference={file.reference}
        service={file.service}
        pricingType={file.pricingType}
        consultantName={consultantName}
      />
    </div>
  )
}

export default Project
