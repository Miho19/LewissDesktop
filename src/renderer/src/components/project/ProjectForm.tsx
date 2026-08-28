import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { getWindowDisplayList } from '@/utility/windowDisplay/getWindowDisplayList'
import { ProjectFile } from '@shared/types/Project.types'
import { WindowDisplay } from '@shared/types/Window.types'
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from '@/components/ui/item'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getRoom } from '@/utility/windowDisplay/getRoom'
import { JSX, useState, SubmitEvent } from 'react'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'
import { getWorksheetListAsync } from '@/utility/process/getWorksheetList'

type Props = {
  file: ProjectFile
}
function ProjectForm(props: Props) {
  const { file } = props
  const [isSubmitPending, setIsSubmitPending] = useState(false)
  const [formError, setFormError] = useState<[string, string][]>([])

  const windowDisplayList = getWindowDisplayList(file)
  if (typeof windowDisplayList === 'undefined' || windowDisplayList.length === 0)
    return <ProjectFormEmpty />

  const outputList = getItemGroup(windowDisplayList, file)

  async function onSubmitHandler(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    let errorMap: Map<string, string> = new Map()

    try {
      setIsSubmitPending(true)
      if (typeof windowDisplayList === 'undefined') return

      const { worksheetList, rejectedReasons } = await getWorksheetListAsync(
        windowDisplayList,
        file
      )

      errorMap = handleGetWorksheetListError(rejectedReasons, errorMap)

      return
    } catch (error) {
      if (error instanceof Error) errorMap.set(`${error.name}`, error.message)
    } finally {
      setIsSubmitPending(false)
      setFormError([...errorMap])
      if (errorMap.size === 0) return

      for (const [key, value] of errorMap) {
        toast.error('Error', {
          description: (
            <>
              <p>{key}</p>
              <p>{value}</p>
            </>
          )
        })
      }
    }
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <CardContent className="py-4">
        <ScrollArea className="h-[518px] pr-4">
          <ul className="">
            <ItemGroup>{outputList}</ItemGroup>
          </ul>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-6 flex justify-end bg-card">
        <Button variant="default" type="submit" disabled={isSubmitPending}>
          {isSubmitPending && <Spinner />}
          Submit
        </Button>
      </CardFooter>
    </form>
  )
}

function handleGetWorksheetListError(
  rejectedReason: any[],
  errorMap: Map<string, string>
): Map<string, string> {
  const map: Map<string, string> = new Map()

  if (rejectedReason.length === 0) return new Map([...errorMap])

  for (const reason of rejectedReason) {
    if (reason instanceof Error) {
      map.set(reason.name, reason.message)
    }
  }

  return new Map([...errorMap, ...map])
}

function getWindowDisplayMap(windowDisplayList: WindowDisplay[]) {
  const map: Map<string, WindowDisplay[]> = new Map()

  for (const w of windowDisplayList) {
    const room = map.get(w.roomId)
    if (typeof room === 'undefined') {
      map.set(w.roomId, [w])
    } else {
      map.set(w.roomId, [...room, w])
    }
  }

  return map
}

function getItemGroup(windowDisplayList: WindowDisplay[], file: ProjectFile) {
  const roomMap = getWindowDisplayMap(windowDisplayList)

  const output: JSX.Element[] = []

  for (const [key, value] of roomMap) {
    const room = getRoom(key, file)
    // failing silently for now
    if (typeof room === 'undefined') return

    const display = getOutputList(value)
    const separator = RoomSeparator(room.name)
    output.push(separator, ...display)
  }

  return output
}

function RoomSeparator(roomName: string) {
  return (
    <div className="flex w-full py-4 px-4 items-center" key={roomName}>
      <div className="grow border-t border" />
      <span className="shrink mx-2 text-[10px] uppercase tracking-wider text-foreground">
        {roomName}
      </span>
      <div className="grow border-t border " />
    </div>
  )
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
      <Item variant="muted" className="bg-muted">
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
