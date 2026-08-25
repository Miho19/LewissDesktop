import { useParams } from '@tanstack/react-router'
import ConsultantHeader from '@/components/consultant/ConsultantHeader'
import { Spinner } from '@/components/ui/spinner'
import useProjectFile from '@/hook/useProjectFile'
import ProjectCard from '@/components/project/ProjectCard'

function Project() {
  const { consultantName, projectId } = useParams({
    from: '/consultant/$consultantName/project/$projectId'
  })

  const { data, isPending, isLoading, isError, error } = useProjectFile(projectId)

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
    <div className="w-full h-full flex flex-col p-6 gap-8">
      <ConsultantHeader name={consultantName} />
      <ProjectCard file={data} />
    </div>
  )
}

export default Project
