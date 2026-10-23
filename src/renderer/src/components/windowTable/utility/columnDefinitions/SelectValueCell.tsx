import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { WindowFormTableFeatures } from '@/components/windowTable/utility/features'
import { WindowTableEntry } from '@shared/types/WindowTableForm.types'
import { CellContext } from '@tanstack/react-table'

function SelectValueCell(
  props: CellContext<WindowFormTableFeatures, WindowTableEntry, string | undefined> & {
    selectOptions: React.JSX.Element[]
  }
) {
  const { getValue, row, column, table, selectOptions } = props

  const initialValue = getValue()

  return (
    <Select
      onValueChange={(newValue) => table.options.meta?.updateData(row.index, column.id, newValue)}
      value={initialValue}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="min-w-0 w-full ">{selectOptions}</SelectContent>
    </Select>
  )
}

export default SelectValueCell
