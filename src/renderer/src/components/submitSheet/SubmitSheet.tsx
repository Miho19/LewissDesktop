import CustomerFieldSet from '@/components/submitSheet/CustomerFieldSet'

import { Button } from '@/components/ui/button'

import { Marker, MarkerContent } from '@/components/ui/marker'
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { ToastErrorOption } from '@/components/windowTable/WindowTableContainer'
import { ProjectFile } from '@shared/types/Project.types'
import { WindowTableEntry } from '@shared/types/WindowTableForm.types'
import { Customer } from '@shared/types/worksheet/Customer.types'
import { ChangeEvent, useEffect, useState } from 'react'

type Props = {
  windowTableEntryList: WindowTableEntry[]
  errorHandler: (options: ToastErrorOption) => void
  file: ProjectFile
}

export type SubmitSheetInputValue = {
  specialInstructions: string
} & Customer

function SubmitSheet(props: Props) {
  const { windowTableEntryList, errorHandler, file } = props

  const [page, setPage] = useState<number>(0)

  const [value, setValue] = useState<SubmitSheetInputValue>({
    customerName: '',
    reference: '',
    salesConsultant: '',
    specialInstructions: ''
  })

  if (windowTableEntryList == null || windowTableEntryList.length === 0) {
    return <SheetContentEmpty />
  }

  const blindType = windowTableEntryList[0].blindType

  useEffect(() => {
    const customer = getCustomer(file)
    setValue((prev) => {
      return {
        ...prev,
        ...customer
      }
    })
  }, [])

  async function onSubmitHandler(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    if (page !== 2) {
      setPage((prev) => prev + 1)
      return
    }
  }

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    setValue((prev) => {
      return { ...prev, [event.target.name]: event.target.value }
    })
  }

  return (
    <SheetContent side="right" showCloseButton={false}>
      <SheetHeader>
        <SheetTitle>
          <Marker variant="separator">
            <MarkerContent>{blindType}</MarkerContent>
          </Marker>
        </SheetTitle>
        <SheetDescription className="w-full flex justify-between items-center"></SheetDescription>
      </SheetHeader>

      <form className="flex w-full px-4" id="create-worksheet-form" onSubmit={onSubmitHandler}>
        {page === 0 && <CustomerFieldSet onInputChange={onInputChange} value={value} />}
        {page}
      </form>
      <SheetFooter>
        <Button variant={'default'} type="submit" form="create-worksheet-form">
          {page !== 2 ? 'Next' : 'Process'}
        </Button>
        <Button
          variant={'outline'}
          type="button"
          onClick={() => {
            if (page > 0) setPage((prev) => prev - 1)
          }}
        >
          {page !== 0 ? 'Back' : 'Cancel'}
        </Button>
      </SheetFooter>
    </SheetContent>
  )
}

function SheetContentEmpty() {
  return <SheetContent side="right" showCloseButton={false}></SheetContent>
}

function getCustomer(file: ProjectFile) {
  const customer: Customer = {
    customerName: file.name,
    reference: file.reference,
    salesConsultant: file.salesConsultant
  }

  return customer
}

export default SubmitSheet
