import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { getWindowDisplayList } from 'renderer/src/utility/windowDisplay/getWindowDisplayList'
import { ProjectFile } from 'shared/types/Project.types'

type Props = {
  file: ProjectFile
}
function ProjectForm(props: Props) {
  const { file } = props

  const windowList = getWindowDisplayList(file)
  console.log(windowList)

  return (
    <form className="flex-1 h-full flex flex-col -mt-(--card-spacing)">
      <CardContent className="flex-1 bg-muted">
        <div className="">hello</div>
      </CardContent>
      <CardFooter className="p-6 flex justify-end">
        <Button variant="default">Submit</Button>
      </CardFooter>
    </form>
  )
}

export default ProjectForm
