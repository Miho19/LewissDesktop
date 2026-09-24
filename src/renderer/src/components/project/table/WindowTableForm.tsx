import WindowTableFooter from '@/components/project/table/WindowTableFooter'
import { CardContent } from '@/components/ui/card'
import { ProjectFile } from '@shared/types/Project.types'

type Props = {
  file: ProjectFile
}

function WindowTableForm(props: Props) {
  return (
    <form>
      <CardContent className="py-4"></CardContent>
      <WindowTableFooter isSubmitPending={false} />
    </form>
  )
}

export default WindowTableForm
