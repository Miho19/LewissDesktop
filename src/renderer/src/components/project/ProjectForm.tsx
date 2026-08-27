import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { getWindowDisplayList } from '@/utility/windowDisplay/getWindowDisplayList'
import { ProjectFile } from 'shared/types/Project.types'
import { WindowDisplay } from 'shared/types/Window.types'
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from '@/components/ui/item'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

type Props = {
  file: ProjectFile
}
function ProjectForm(props: Props) {
  const { file } = props

  const windowDisplayList = getWindowDisplayList(file)
  if (typeof windowDisplayList === 'undefined' || windowDisplayList.length === 0)
    return <ProjectFormEmpty />

  const outputList = getOutputList(windowDisplayList)

  return (
    <form className="bg-muted">
      <CardContent className="py-4">
        <ScrollArea className="h-[518px] pr-4">
          <ul className="">
            <ItemGroup>{outputList}</ItemGroup>
          </ul>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-6 flex justify-end">
        <Button variant="default">Submit</Button>
      </CardFooter>
    </form>
  )
}

{
  /* <form className="flex-1 h-full flex flex-col -mt-(--card-spacing)">
      <CardContent className="flex-1 bg-muted p-0">
        <ScrollArea className="h-96">
          <ul className="flex flex-col space-y-4">
            <ItemGroup>{outputList}</ItemGroup>
          </ul>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-6 flex justify-end">
        <Button variant="default">Submit</Button>
      </CardFooter>
    </form> */
}

function ProjectFormEmpty() {
  return (
    <form className="flex-1 h-full flex flex-col -mt-(--card-spacing)">
      <CardContent className="flex-1 bg-muted">
        <p className="">No rooms to process</p>
      </CardContent>
    </form>
  )
}

function getOutputList(windowDisplayList: WindowDisplay[]) {
  return windowDisplayList.map((w) => (
    <li key={`${w.windowId}-${w.fit}`}>
      <Item variant="outline" className="bg-background">
        <ItemContent>
          <ItemTitle>{w.windowId}</ItemTitle>
          <ItemDescription>{w.fit}</ItemDescription>
        </ItemContent>
        <ItemContent>
          <ItemDescription>{w.blindCount}</ItemDescription>
        </ItemContent>
      </Item>
    </li>
  ))
}

export default ProjectForm
