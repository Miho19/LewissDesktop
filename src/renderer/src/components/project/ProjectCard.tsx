import { ProjectFile } from 'shared/types/Project.types'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type Props = {
  file: ProjectFile
}
function ProjectCard(props: Props) {
  const { file } = props

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>
          {file.name} - {file.reference}
        </CardTitle>
        <CardDescription>
          {file.service} - {file.pricingType}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

export default ProjectCard
