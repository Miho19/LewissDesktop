import { ProjectFile } from 'shared/types/Project.types'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type Props = {
  file: ProjectFile
}
function ProjectCard(props: Props) {
  const { file } = props

  return (
    <Card className="h-full w-full">
      <CardHeader className="">
        <CardTitle>
          {file.name} - {file.reference}
        </CardTitle>
        <CardDescription>
          {file.service} - {file.pricingType}
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="flex-1 -my-(--card-spacing) bg-muted"></CardContent>
      <CardFooter className="h-16">
        <button className="btprimary">Submit</button>
      </CardFooter>
    </Card>
  )
}

export default ProjectCard
