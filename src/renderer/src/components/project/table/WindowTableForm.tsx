import WindowTable from '@/components/project/table/WindowTable'
import WindowTableFooter from '@/components/project/table/WindowTableFooter'
import {
  windowTableFeatures,
  windowTableColumns
} from '@/components/project/table/windowTableUtility'
import { CardContent } from '@/components/ui/card'
import { getWindowDisplayList } from '@/utility/windowDisplay/getWindowDisplayList'
import { ProjectFile } from '@shared/types/Project.types'
import { useTable } from '@tanstack/react-table'
import { useState } from 'react'

type Props = {
  file: ProjectFile
}

function WindowTableForm(props: Props) {
  const { file } = props

  const [rowSelection, setRowSelection] = useState({})

  const windowDisplayList = getWindowDisplayList(file)

  const table = useTable({
    features: windowTableFeatures,
    columns: windowTableColumns,
    data: windowDisplayList,
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection
    }
  })

  return (
    <form>
      <CardContent className="py-4">
        <WindowTable table={table} />
      </CardContent>
      {/* <WindowTableFooter isSubmitPending={false} /> */}
    </form>
  )
}

export default WindowTableForm
