import { Input } from '@/components/ui/input'
import { WindowFormTableFeatures } from '@/components/windowTable/utility/features'
import { WindowTableEntry } from '@shared/types/WindowTableForm.types'
import { CellContext } from '@tanstack/react-table'
import { useEffect, useState } from 'react'

function EditableCell(props: CellContext<WindowFormTableFeatures, WindowTableEntry>) {
  const { getValue, row, column, table } = props

  const initialValue = getValue()
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  function onBlur() {
    table.options.meta?.updateData(row.index, column.id, value)
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') onBlur()
  }

  return (
    <Input
      value={value as string}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    />
  )
}

export default EditableCell
