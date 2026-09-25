import SpecSheetContent from '@/components/project/table/SpecSheetContent'
import WindowTable from '@/components/project/table/WindowTable'
import WindowTableFooter from '@/components/project/table/WindowTableFooter'
import {
  windowTableFeatures,
  windowTableColumns
} from '@/components/project/table/windowTableUtility'
import { CardContent } from '@/components/ui/card'
import { Sheet } from '@/components/ui/sheet'
import { getWindowDisplayList } from '@/utility/windowDisplay/getWindowDisplayList'
import { ProjectFile } from '@shared/types/Project.types'
import { WindowDisplay } from '@shared/types/WindowDisplay.types'
import { useTable } from '@tanstack/react-table'
import { useState } from 'react'

type Props = {
  file: ProjectFile
}

function WindowTableForm(props: Props) {
  const { file } = props

  const [rowSelection, setRowSelection] = useState({})
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false)
  const [rowSelected, setRowSelected] = useState<WindowDisplay | undefined>(undefined)

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

  const totalSelected = table.getFilteredSelectedRowModel().rows.length
  const totalRows = table.getFilteredRowModel().rows.length

  const selectedOutputString = `${totalSelected} of ${totalRows} selected`

  function onRowClick(row: WindowDisplay) {
    setIsSheetOpen(true)
    setRowSelected(row)
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <form>
        <CardContent className="py-4">
          <WindowTable table={table} onRowClick={onRowClick} />
        </CardContent>
        <WindowTableFooter isSubmitPending={false} selectedRowsString={selectedOutputString} />
      </form>
      <SpecSheetContent windowDisplay={rowSelected} setSheetOpen={setIsSheetOpen} />
    </Sheet>
  )
}

export default WindowTableForm
