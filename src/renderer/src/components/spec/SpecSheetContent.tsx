import FabricItem from '@/components/spec/FabricItem'
import SpecFactory from '@/components/spec/SpecFactory'
import { ItemGroup } from '@/components/ui/item'
import { Marker, MarkerContent } from '@/components/ui/marker'
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { ToastErrorOption } from '@/components/windowTable/WindowTableContainer'
import { capitalise } from '@/utility/general/capitalise'
import { getBlindTypeFromSpec } from '@/utility/process/worksheet/getBlindTypeFromSpec'
import { WindowDisplay } from '@shared/types/WindowDisplay.types'
import { WindowTableEntry } from '@shared/types/WindowTableForm.types'

type Props = {
  windowTableEntry?: WindowTableEntry
  errorHandler: (options: ToastErrorOption) => void
}

function SpecSheetContent(props: Props) {
  const { windowTableEntry, errorHandler } = props

  if (windowTableEntry == null) {
    //errorHandler({ message: '', showToast: false })
    return <SheetContentEmpty />
  }

  const { roomName, windowName, fit, blindCount, spec } = windowTableEntry.windowDisplay
  const location = `${roomName} - ${windowName}`

  const blindType = getBlindTypeFromSpec(spec)

  if (typeof blindType === 'undefined') {
    errorHandler({ message: 'Blind type is undefined or null' })
    return <SheetContentEmpty />
  }

  const { fabric } = spec
  if (fabric == null) {
    errorHandler({ message: 'Fabric is undefined or null' })
    return <SheetContentEmpty />
  }

  return (
    <SheetContent side="right" showCloseButton={false}>
      <SheetHeader>
        <SheetTitle>{location}</SheetTitle>
        <SheetDescription className="w-full flex justify-between items-center">
          {getMeasurement(windowTableEntry.windowDisplay)}
        </SheetDescription>
        <SheetDescription className="w-full flex justify-between items-center">
          <span>{capitalise(fit)}</span>
          <span>{capitalise(blindCount)}</span>
        </SheetDescription>
      </SheetHeader>

      <div className="flex-1 p-4 flex flex-col gap-6">
        <Marker variant={'separator'}>
          <MarkerContent>{blindType}</MarkerContent>
        </Marker>

        <ItemGroup className="w-full h-full flex flex-col">
          <FabricItem fabric={fabric} />
          <SpecFactory blindType={blindType} spec={spec} errorHandler={errorHandler} />
        </ItemGroup>
      </div>
    </SheetContent>
  )
}

function getMeasurement(windowDisplay: WindowDisplay) {
  const { width, height, roomId, windowId, fit, spec } = windowDisplay

  return width.map((w, index) => (
    <span key={`${roomId}-${windowId}-${width[index]}-${height}-${fit}-${spec.fabric?.name}`}>
      {w}mm x {height}mm
    </span>
  ))
}

function SheetContentEmpty() {
  return <SheetContent side="right" showCloseButton={false}></SheetContent>
}

export default SpecSheetContent
