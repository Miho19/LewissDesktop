import { Marker, MarkerContent } from '@/components/ui/marker'
import {
  getWindowFormTableColumnDefinition,
  kineticsRollerControlSplitName,
  KineticsRollerControlSplitType
} from '@/components/windowTable/utility/columnDefinitions'
import { windowFormTableFeatures } from '@/components/windowTable/utility/features'
import { updateWindowTableEntryCost } from '@/components/windowTable/utility/updatePrice'
import WindowFormTableFooter from '@/components/windowTable/WindowFormTableFooter'
import WindowTable from '@/components/windowTable/WindowTable'
import { ToastDisplayOptions } from '@/components/windowTable/WindowTableContainer'
import { getTableEntryListAsync } from '@/utility/process/tableEntry'
import { kineticsRollerDestructureControlString } from '@/utility/process/tableEntry/kineticsRoller'
import { Blind } from '@shared/types/blind/blind.types'
import { ProjectFile } from '@shared/types/Project.types'
import {
  isKineticsRollerTableEntry,
  KineticsRollerTableEntry
} from '@shared/types/tableEntry/kineticsRoller.types'
import { WindowDisplay } from '@shared/types/WindowDisplay.types'
import { WindowTableEntry } from '@shared/types/WindowTableForm.types'
import { useSuspenseQuery } from '@tanstack/react-query'
import { RowSelectionState, useTable } from '@tanstack/react-table'
import { useState } from 'react'

type Props = {
  blindType: Blind
  windowDisplayList: WindowDisplay[]
  file: ProjectFile
  openSheet: (WindowTableEntryList: WindowTableEntry[]) => void
  toastMessage: (message: string, type: ToastDisplayOptions) => void
}

function WindowFormTable(props: Props) {
  const { blindType, windowDisplayList, file, openSheet, toastMessage } = props

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const {
    data: initialTableData,
    error,
    isFetching
  } = useSuspenseQuery<WindowTableEntry[]>({
    queryKey: [`${blindType}`, `${file.reference}`],
    queryFn: async () => await getWindowTableEntryList(blindType, windowDisplayList, file)
  })

  const [data, setData] = useState(initialTableData)

  async function updateData(rowIndex: number, columnId: string, value: unknown) {
    const prevData = data.find((_, index) => index === rowIndex)
    if (typeof prevData === 'undefined') return

    const updatedData: WindowTableEntry = {
      ...prevData,
      tableEntry: {
        ...prevData.tableEntry,
        [columnId]: value
      }
    }

    // this is a quick get it working solution -- need to update meta signature to pass in blind type to expand this

    if ((kineticsRollerControlSplitName as readonly string[]).includes(columnId)) {
      const tableEntry = prevData.tableEntry
      if (!isKineticsRollerTableEntry(tableEntry)) return updatedData
      const controlObject = kineticsRollerDestructureControlString(tableEntry.control)
      if (typeof controlObject === 'undefined') return updatedData

      const map: Record<KineticsRollerControlSplitType, string> = {
        controlType: controlObject.type,
        controlColour: controlObject.colour,
        controlLength: controlObject.length
      }

      const updatedMap = {
        ...map,
        [columnId]: value
      }

      const controlOutput = Object.values(updatedMap)
        .map((s) => s)
        .join('-')
    }

    const priceUpdatedWindowTableEntry = await updateWindowTableEntryCost(updatedData)

    setData((prev) => {
      return prev.map((row, index) => {
        if (index !== rowIndex) return row
        return priceUpdatedWindowTableEntry
      })
    })
  }

  const table = useTable({
    features: windowFormTableFeatures,
    columns: getWindowFormTableColumnDefinition(blindType),
    data: data,
    columnResizeMode: 'onChange',
    defaultColumn: {
      size: 150,
      minSize: 50,
      maxSize: 350
    },
    meta: {
      updateData
    },
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection
    }
  })

  if (error && !isFetching) {
    throw error
  }

  const totalSelected = table.getFilteredSelectedRowModel().rows.length
  const totalRows = table.getFilteredRowModel().rows.length

  const numberOfSelectedRowsString = `${totalSelected} of ${totalRows} selected`

  async function onSubmitHandler(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const WindowTableEntryList = table.getFilteredSelectedRowModel().rows.map((row) => row.original)

    if (WindowTableEntryList.length === 0) {
      toastMessage(`No '${blindType} windows selected'`, 'error')
      return
    }

    openSheet(WindowTableEntryList)
  }

  const unableToDisplayString = `Unable to display ${windowDisplayList.length} ${windowDisplayList.length > 1 ? 'windows' : 'window'}`

  return (
    <form className="flex flex-col w-full gap-8" onSubmit={onSubmitHandler}>
      <div className="flex w-full justify-between">
        <Marker variant={'separator'}>
          <MarkerContent>{blindType}</MarkerContent>
        </Marker>
      </div>

      {data.length === 0 ? (
        <p className="flex w-full items-center justify-center text-sm text-muted-foreground">
          {unableToDisplayString}
        </p>
      ) : (
        <>
          <WindowTable table={table} />
          <WindowFormTableFooter numberOfSelectedRowsString={numberOfSelectedRowsString} />
        </>
      )}
    </form>
  )
}

async function getWindowTableEntryList(
  blindType: Blind,
  windowDisplayList: WindowDisplay[],
  file: ProjectFile
) {
  // breaking functional programming here but do not know another solution currently

  const entries: WindowTableEntry[] = []

  await getTableEntryListAsync(
    blindType,
    windowDisplayList,
    file,
    (blindType, windowDisplay, tableEntry) => {
      const newEntry: WindowTableEntry = {
        blindType,
        windowDisplay,
        tableEntry
      }

      entries.push(newEntry)
    }
  )

  return entries
}

export default WindowFormTable
