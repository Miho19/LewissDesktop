import { SubmitSheetInputValue } from '@/components/submitSheet/SubmitSheet'
import { FieldSet, FieldLegend, Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { ChangeEvent } from 'react'

type Props = {
  value: SubmitSheetInputValue
  onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

function MotorAccessory(props: Props) {
  const { value, onInputChange } = props

  return (
    <FieldSet className="w-full">
      <FieldLegend>Motor Accessories</FieldLegend>

      <Field>
        <FieldLabel htmlFor="remote">15 Channel Remote</FieldLabel>
        <Input
          id="remote"
          name="remote"
          value={value.remote}
          type="number"
          onChange={onInputChange}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="charger">USB Charger Cable</FieldLabel>
        <Input
          id="charger"
          name="charger"
          value={value.charger}
          type="number"
          onChange={onInputChange}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="smartHub">SmartHub</FieldLabel>
        <Input
          id="smartHub"
          name="smartHub"
          value={value.smartHub}
          type="number"
          onChange={onInputChange}
        />
      </Field>
    </FieldSet>
  )
}

export default MotorAccessory
