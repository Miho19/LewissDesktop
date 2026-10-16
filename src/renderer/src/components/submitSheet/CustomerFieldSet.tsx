import { SubmitSheetErrorObject, SubmitSheetInputValue } from '@/components/submitSheet/SubmitSheet'
import { Field, FieldDescription, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import useStaffList from '@/hook/useStaffList'
import { capitalise } from '@/utility/general/capitalise'
import { ChangeEvent } from 'react'
import { toast } from 'sonner'

type Props = {
  value: SubmitSheetInputValue
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void
  referenceOnChange: (newValue: string) => void
  errorObject: SubmitSheetErrorObject
  onSelectChange: (inputName: keyof SubmitSheetErrorObject, value: string) => void
}

function CustomerFieldSet(props: Props) {
  const { value, onInputChange, referenceOnChange, errorObject, onSelectChange } = props

  const {
    data: staffList,
    isPending: isPendingStaffList,
    isLoading: isLoadingStaffList,
    isError: isErrorStaffList,
    error: errorStafflist
  } = useStaffList()

  if (isPendingStaffList || isLoadingStaffList) return <ConsultantListSkeleton />

  if (isErrorStaffList) {
    toast.error('Customer Field Set', {
      id: 'customer-field-set',
      description: (
        <>
          <p>{errorStafflist.name}</p>
          <p>{errorStafflist.message}</p>
        </>
      )
    })

    return <div className="w-full"></div>
  }

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

        <Select
          onValueChange={(value) => onSelectChange('salesConsultant', value ?? 'Terry Donald')}

          value={value.salesConsultant}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {staffList.consultants.map((consultant) => (
                <SelectItem value={consultant.name} key={consultant.name}>
                  {capitalise(consultant.name)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {errorObject.salesConsultant.isError && (
          <FieldDescription>{errorObject.salesConsultant.message}</FieldDescription>
        )}
      </Field>
    </FieldSet>
  )
}

function ConsultantListSkeleton() {
  return (
    <div className="w-full flex flex-col p-6 gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  )
}

export default CustomerFieldSet
