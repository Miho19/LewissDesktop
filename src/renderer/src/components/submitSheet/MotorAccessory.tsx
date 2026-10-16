import { SubmitSheetErrorObject, SubmitSheetInputValue } from '@/components/submitSheet/SubmitSheet'
import { FieldSet, FieldLegend, Field, FieldLabel, FieldDescription } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Blind } from '@shared/types/blind/blind.types'
import { ChangeEvent } from 'react'

type Props = {
  blindType: Blind
  value: SubmitSheetInputValue
  onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  errorObject: SubmitSheetErrorObject
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
  const { blindType } = props

  switch (blindType) {
    case 'Kinetics 10mm Cellular Blind':
    case 'Kinetics 20mm Cellular Blind':
    case 'Kinetics Blockout Roller Blind':
    case 'Kinetics Light Filtering Roller Blind':
    case 'Kinetics Sunscreen Roller Blind':
    case 'Kinetics Mikronwood 50mm Venetian':
      return kineticsFieldSet(props)
    default:
      return <p>Not implemented yet</p>
  }
}

function kineticsFieldSet({ value, onInputChange, errorObject }: Props) {
  return (
    <>
      <Field data-invalid={!!errorObject.remote.isError}>
        <FieldLabel htmlFor="remote">15 Channel Remote</FieldLabel>
        <Input
          id="remote"
          name="remote"
          value={value.remote}
          type="number"

          onChange={onInputChange}
          aria-invalid={!!errorObject.remote.isError}
        />
        {errorObject.remote.isError && (
          <FieldDescription>{errorObject.remote.message}</FieldDescription>
        )}
      </Field>
      <Field data-invalid={!!errorObject.charger.isError}>
        <FieldLabel htmlFor="charger">USB Charger Cable</FieldLabel>
        <Input
          id="charger"
          name="charger"
          value={value.charger}
          type="number"

          onChange={onInputChange}
          aria-invalid={!!errorObject.charger.isError}
        />
        {errorObject.charger.isError && (
          <FieldDescription>{errorObject.charger.message}</FieldDescription>
        )}
      </Field>
      <Field data-invalid={!!errorObject.smartHub.isError}>
        <FieldLabel htmlFor="smartHub">SmartHub</FieldLabel>
        <Input
          id="smartHub"
          name="smartHub"
          value={value.smartHub}
          type="number"

          onChange={onInputChange}
          aria-invalid={!!errorObject.smartHub.isError}
        />
        {errorObject.smartHub.isError && (
          <FieldDescription>{errorObject.smartHub.message}</FieldDescription>
        )}
      </Field>
    </>
  )
}

export default MotorAccessory
