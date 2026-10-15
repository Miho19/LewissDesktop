import CustomerFieldSet from '@/components/submitSheet/CustomerFieldSet'
import InstructionsFieldSet from '@/components/submitSheet/InstructionsFieldSet'
import MotorAccessory from '@/components/submitSheet/MotorAccessory'

import { Button } from '@/components/ui/button'

import { Marker, MarkerContent } from '@/components/ui/marker'
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { ToastDisplayOptions } from '@/components/windowTable/WindowTableContainer'
import { createWorksheetPDF } from '@/utility/process/pdf/createWorksheetPDF'
import { openWorksheetPDF } from '@/utility/process/pdf/openWorksheetPDF'
import { kineticsGetWorksheetCostAsync } from '@/utility/process/worksheet/cost'
import { ProjectFile } from '@shared/types/Project.types'
import { WindowTableEntry } from '@shared/types/WindowTableForm.types'
import { Customer } from '@shared/types/worksheet/Customer.types'
import { Worksheet } from '@shared/types/worksheet/Worksheet.types'
import { ChangeEvent, useEffect, useState } from 'react'

type Props = {
  windowTableEntryList: WindowTableEntry[]
  showToast: (message: string, type: ToastDisplayOptions) => void
  closeSheet: () => void
  file: ProjectFile
}

export type SubmitSheetInputValue = {
  instructions: string
  remote: number
  charger: number
  smartHub: number
} & Customer

function SubmitSheet(props: Props) {
  const { windowTableEntryList, showToast, closeSheet, file } = props

  const [isSubmitPending, setIsSubmitPending] = useState(false)

  const [page, setPage] = useState<number>(0)

  const [value, setValue] = useState<SubmitSheetInputValue>({
    customerName: '',
    reference: '',
    salesConsultant: '',
    instructions: '',
    remote: 0,
    charger: 0,
    smartHub: 0
  })

  useEffect(() => {
    const customer = getCustomer(file)
    setValue((prev) => {
      return {
        ...prev,
        ...customer
      }
    })
  }, [])

  if (windowTableEntryList == null || windowTableEntryList.length === 0) {
    return <SheetContentEmpty />
  }

  const blindType = windowTableEntryList[0].blindType

  async function onSubmitHandler(event: React.SubmitEvent<HTMLFormElement>) {
    try {
      event.preventDefault()

      if (isSubmitPending) return

      if (page !== 2) {
        setPage((prev) => prev + 1)
        return
      }

      setIsSubmitPending(true)

      const customer: Customer = {
        customerName: value.customerName,
        reference: value.reference,
        salesConsultant: value.salesConsultant
      }

      const tableEntryList = windowTableEntryList.map((wt) => wt.tableEntry)

      const { remote, charger, smartHub } = value

      const worksheetCost = await kineticsGetWorksheetCostAsync(
        tableEntryList,
        remote,
        charger,
        smartHub
      )

      if (typeof worksheetCost === 'undefined') {
        showToast('worksheet cost returned undefined', 'error')
        closeSheet()
        return
      }

      const worksheet: Worksheet = {
        blindType,
        customer,
        worksheetCost,
        tableEntryList: tableEntryList
      }

      const pdfResponse = await createWorksheetPDF(worksheet)

      await openWorksheetPDF(pdfResponse)
      showToast('PDF created', 'success')
      closeSheet()
    } catch (error) {
    } finally {
      setIsSubmitPending(false)
    }
  }

  function onInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setValue((prev) => {
      return { ...prev, [event.target.name]: event.target.value }
    })
  }

  function backButtonOnClick() {
    if (page > 0) {
      setPage((prev) => prev - 1)
      return
    }

    closeSheet()
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
        {page === 1 && <InstructionsFieldSet onInputChange={onInputChange} value={value} />}
        {page === 2 && <MotorAccessory onInputChange={onInputChange} value={value} />}
      </form>
      <SheetFooter>
        <Button
          variant={'default'}
          type="submit"
          form="create-worksheet-form"
          disabled={isSubmitPending}
        >
          {page !== 2 ? 'Next' : 'Process'}
        </Button>
        <Button variant={'outline'} type="button" onClick={backButtonOnClick}>
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
