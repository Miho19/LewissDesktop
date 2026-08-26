import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { ProjectFile } from 'shared/types/Project.types'

type Props = {
  file: ProjectFile
}
function ProjectForm(props: Props) {
  const { file } = props

  return (
    <form>
      <CardContent className="flex-1 -my-(--card-spacing) bg-muted"></CardContent>
      <CardFooter className="h-16 flex items-center justify-end">
        <Button variant="default">Submit</Button>
      </CardFooter>
    </form>
  )
}

function getWindows(file: ProjectFile) {}

export default ProjectForm
