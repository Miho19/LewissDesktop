import { Separator } from '@/components/ui/separator'
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { capitalise } from '@/utility/general/capitalise'
import { getBlindTypeFromSpec } from '@/utility/process/worksheet/getBlindTypeFromSpec'
import { WindowDisplay } from '@shared/types/WindowDisplay.types'
import { toast } from 'sonner'

type Props = {
  windowDisplay?: WindowDisplay
  setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function SpecSheetContent(props: Props) {
  const { windowDisplay, setSheetOpen } = props
  if (windowDisplay == null) return <SheetContentEmpty />

  const { roomName, windowName, fit, blindCount, spec } = windowDisplay
  const location = `${roomName} - ${windowName}`

  const blindType = getBlindTypeFromSpec(spec)
  if (typeof blindType === 'undefined') {
    toast.error('Treatment Specification', {
      id: 'treatment-specification',
      description: <p className="bg-background text-foreground font-sans">Invalid blind type</p>
    })

    setSheetOpen(false)
    return
  }

  return (
    <SheetContent side="right" showCloseButton={false}>
      <SheetHeader>
        <SheetTitle>{location}</SheetTitle>
        <SheetDescription className="w-full flex justify-between items-center">
          {getMeasurement(windowDisplay)}
        </SheetDescription>
        <SheetDescription className="w-full flex justify-between items-center">
          <span>{capitalise(fit)}</span>
          <span>{capitalise(blindCount)}</span>
        </SheetDescription>
      </SheetHeader>
      <div className="flex-1 p-4">
        <p>{blindType}</p>
        <Separator />
      </div>
    </SheetContent>
  )
}

function getMeasurement(windowDisplay: WindowDisplay) {
  const { width, height, roomId, windowId, fit, spec } = windowDisplay

  return width.map((w) => (
    <p key={`${roomId}-${windowId}-${width}-${height}-${fit}-${spec.fabric?.name}`}>
      {w}mm x {height}mm
    </p>
  ))
}

function SheetContentEmpty() {
  return <SheetContent side="right" showCloseButton={false}></SheetContent>
}

export default SpecSheetContent
