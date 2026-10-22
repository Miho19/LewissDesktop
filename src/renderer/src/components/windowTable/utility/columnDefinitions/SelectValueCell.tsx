import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue
} from '@/components/ui/select'
import { WindowFormTableFeatures } from '@/components/windowTable/utility/features'
import { capitalise } from '@/utility/general/capitalise'
import { WindowTableEntry } from '@shared/types/WindowTableForm.types'
import { CellContext } from '@tanstack/react-table'

function SelectValueCell(
  props: CellContext<WindowFormTableFeatures, WindowTableEntry, string | undefined> & {
    validOptions: readonly string[]
  }
) {
  const { getValue, row, column, table, validOptions } = props

  const initialValue = getValue()

  const selectableList = validOptions
    .map((option) => capitalise(option))
    .map((option, index) => (
      <SelectItem key={`${option} ${index}`} value={option}>
        {option}
      </SelectItem>
    ))

  return (
    <Select
      onValueChange={(newValue) => table.options.meta?.updateData(row.index, column.id, newValue)}
      value={initialValue}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger>{selectableList}</SelectContent>
    </Select>
  )
}

export default SelectValueCell
