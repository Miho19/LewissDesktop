import { ProjectFile } from 'shared/types/Project.types'
import { Card } from '@/components/ui/card'
import ProjectHeader from './ProjectHeader'
import ProjectForm from './ProjectForm'

type Props = {
  file: ProjectFile
}
function ProjectCard(props: Props) {
  const { file } = props

  return (
    <Card className="bg-card">
      <ProjectHeader
        name={file.name}
        reference={file.reference}
        service={file.service}
        pricingType={file.pricingType}
      />

      <ProjectForm file={file} />
    </Card>
  )
}

export default ProjectCard
