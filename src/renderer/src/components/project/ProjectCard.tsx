import { ProjectFile } from '@shared/types/Project.types'
import { Card } from '@/components/ui/card'
import ProjectHeader from './ProjectHeader'
import ProjectForm from './list/ProjectForm'
import WindowTableForm from '@/components/project/table/WindowTableForm'

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

      <WindowTableForm file={file} />
    </Card>
  )
}

export default ProjectCard
