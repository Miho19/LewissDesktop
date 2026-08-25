import { useParams } from '@tanstack/react-router'

function Project() {
  const { consultantName, projectId } = useParams({
    from: '/consultant/$consultantName/project/$projectId'
  })

  return (
    <div className="w-full h-full flex flex-col rounded-md p-6 gap-8">
      <h1>consultant: {consultantName}</h1>
      <h1>project: {projectId}</h1>
    </div>
  )
}

export default Project
