import { getTableEntryListAsync } from '@/utility/process/tableEntry'
import { Blind } from '@shared/types/blind/blind.types'
import { ProjectFile } from '@shared/types/Project.types'
import { WindowDisplay } from '@shared/types/WindowDisplay.types'
import { WindowTableEntry } from '@shared/types/WindowTableForm.types'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useState } from 'react'

type Props = {
  blindType: Blind
  windowDisplayList: WindowDisplay[]
  file: ProjectFile
  rowOnClick: (row: WindowTableEntry) => void
  onSubmitHandler: (selected: WindowTableEntry[]) => void
}

function WindowTable(props: Props) {
  const { blindType, windowDisplayList, file, rowOnClick, onSubmitHandler } = props

  const [rowSelection, setRowSelection] = useState({})

  const { data, error, isFetching } = useSuspenseQuery<WindowTableEntry[]>({
    queryKey: [`${blindType} initial window table form`],
    queryFn: async () => await getWindowTableEntryList(blindType, windowDisplayList, file)
  })

  if (error && !isFetching) {
    throw error
  }

  return <form></form>
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

export default WindowTable
