import { ProjectFile } from 'shared/types/Project.types'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import ProjectHeader from './ProjectHeader'

type Props = {
  file: ProjectFile
}
function ProjectCard(props: Props) {
  const { file } = props

  return (
    <Card className="h-full w-full">
      <ProjectHeader
        name={file.name}
        reference={file.reference}
        service={file.service}
        pricingType={file.pricingType}
      />
      <Separator />
    </Card>
  )
}

export default ProjectCard
