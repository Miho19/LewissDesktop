import { SubmitSheetInputValue } from '@/components/submitSheet/SubmitSheet'
import { Field, FieldDescription, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { ChangeEvent } from 'react'

type Props = {
  value: SubmitSheetInputValue
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void
}

function CustomerFieldSet(props: Props) {
  const { value, onInputChange } = props
  return (
    <FieldSet className="w-full">
      <FieldLegend>Customer</FieldLegend>
      <FieldDescription></FieldDescription>
      <Field>
        <FieldLabel htmlFor="customerName">Full Name</FieldLabel>
        <Input
          id="customerName"
          name="customerName"
          onChange={onInputChange}
          value={value.customerName}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="reference">Reference</FieldLabel>
        <Input id="reference" name="reference" onChange={onInputChange} value={value.reference} />
      </Field>

      <Field>
        <FieldLabel htmlFor="salesConsultant">Sales Consultant</FieldLabel>
        <Input
          id="salesConsultant"
          name="salesConsultant"
          onChange={onInputChange}
          value={value.salesConsultant}
        />
      </Field>
    </FieldSet>
  )
}

export default CustomerFieldSet
