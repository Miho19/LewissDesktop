import { SubmitSheetInputValue } from '@/components/submitSheet/SubmitSheet'
import { Field, FieldDescription, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { ChangeEvent } from 'react'

type Props = {
  value: SubmitSheetInputValue
  onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

function InstructionsFieldSet(props: Props) {
  const { value, onInputChange } = props

  return (
    <FieldSet className="w-full">
      <FieldLegend>Special Instructions</FieldLegend>
      <FieldDescription>Instructions will be placed on PDF</FieldDescription>
      <Field>
        <FieldLabel htmlFor="instructions">Factory Instructions</FieldLabel>
        <Textarea
          id="instructions"
          name="instructions"

          value={value.instructions}
          onChange={onInputChange}
          rows={5}
          cols={40}
        />
      </Field>
    </FieldSet>
  )
}

export default InstructionsFieldSet
