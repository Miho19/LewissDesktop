import { SubmitSheetErrorObject, SubmitSheetInputValue } from '@/components/submitSheet/SubmitSheet'
import { Field, FieldDescription, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { ChangeEvent } from 'react'

type Props = {
  value: SubmitSheetInputValue
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void
  referenceOnChange: (newValue: string) => void
  errorObject: SubmitSheetErrorObject
}

function CustomerFieldSet(props: Props) {
  const { value, onInputChange, referenceOnChange, errorObject } = props
  return (
    <FieldSet className="w-full">
      <FieldLegend>Customer</FieldLegend>
      <FieldDescription></FieldDescription>

      <Field data-invalid={!!errorObject.customerName.isError}>
        <FieldLabel htmlFor="customerName">Full Name</FieldLabel>
        <Input
          id="customerName"
          name="customerName"
          onChange={onInputChange}
          value={value.customerName}
          aria-invalid={!!errorObject.customerName.isError}
        />
        {errorObject.customerName.isError && (
          <FieldDescription>{errorObject.customerName.message}</FieldDescription>
        )}
      </Field>

      <Field data-invalid={!!errorObject.reference.isError}>
        <FieldLabel htmlFor="reference">Reference</FieldLabel>

        <InputOTP
          id="reference"
          name="reference"
          maxLength={10}
          value={value.reference}
          onChange={referenceOnChange}
        >
          <InputOTPGroup>
            {[...Array(5)].map((_, index) => (
              <InputOTPSlot
                index={index}
                aria-invalid={!!errorObject.reference.isError}
                key={index}
              />
            ))}
          </InputOTPGroup>
          <InputOTPSeparator className="mx-2" />
          <InputOTPGroup>
            {[...Array(5)].map((_, index) => (
              <InputOTPSlot
                index={index + 5}
                aria-invalid={!!errorObject.reference.isError}
                key={index + 5}
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        {errorObject.reference.isError && (
          <FieldDescription>{errorObject.reference.message}</FieldDescription>
        )}
      </Field>

      <Field data-invalid={!!errorObject.salesConsultant.isError}>
        <FieldLabel htmlFor="salesConsultant">Sales Consultant</FieldLabel>
        <Input
          id="salesConsultant"
          name="salesConsultant"
          onChange={onInputChange}
          value={value.salesConsultant}
          aria-invalid={!!errorObject.salesConsultant.isError}
        />
        {errorObject.salesConsultant.isError && (
          <FieldDescription>{errorObject.salesConsultant.message}</FieldDescription>
        )}
      </Field>
    </FieldSet>
  )
}

export default CustomerFieldSet
