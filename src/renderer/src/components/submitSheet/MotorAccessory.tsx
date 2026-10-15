import { SubmitSheetInputValue } from '@/components/submitSheet/SubmitSheet'
import { FieldSet, FieldLegend, Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Blind } from '@shared/types/blind/blind.types'
import { ChangeEvent } from 'react'

type Props = {
  blindType: Blind
  value: SubmitSheetInputValue
  onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

function MotorAccessory(props: Props) {
  const fields = getMotorFields(props)

  return (
    <FieldSet className="w-full">
      <FieldLegend>Motor Accessories</FieldLegend>
      {fields}
    </FieldSet>
  )
}

function getMotorFields(props: Props) {
  const { value, onInputChange, blindType } = props

  switch (blindType) {
    case 'Kinetics 10mm Cellular Blind':
    case 'Kinetics 20mm Cellular Blind':
    case 'Kinetics Blockout Roller Blind':
    case 'Kinetics Light Filtering Roller Blind':
    case 'Kinetics Sunscreen Roller Blind':
    case 'Kinetics Mikronwood 50mm Venetian':
      return kineticsFieldSet(value, onInputChange)
    default:
      return <p>Not implemented yet</p>
  }
}

function kineticsFieldSet(value: Props['value'], onInputChange: Props['onInputChange']) {
  return (
    <>
      <Field>
        <FieldLabel htmlFor="remote">15 Channel Remote</FieldLabel>
        <Input
          id="remote"
          name="remote"
          value={value.remote}
          type="number"
          min={0}
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
          min={0}
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
          min={0}
          onChange={onInputChange}
        />
      </Field>
    </>
  )
}

export default MotorAccessory
