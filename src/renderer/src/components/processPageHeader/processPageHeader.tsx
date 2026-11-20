import CustomerHeader from '@/components/processPageHeader/CustomerHeader'
import WorksheetHeader from '@/components/processPageHeader/worksheetHeader'
import { ProcessFile } from '@shared/types/process/Process.types'

type Props = {
  file: ProcessFile
}

/**
 *
 * @param props
 *
 * Display out project info customer number, invoice number, build? sales consultant, measurer
 * pricing type ---> new build???
 * call out fee?
 * deposit amount ---> can potentially just grab it from xero if we have bank number / invoice
 *
 *
 * @returns
 */

function ProcessPageHeader(props: Props) {
  const { file } = props
  const { customer } = file

  console.log(file)
  // lazy for now, will destruct objects later
  return (
    <div className="flex flex-col w-full gap-8">
      <CustomerHeader {...customer} />
      <WorksheetHeader {...file} />
    </div>
  )
}

export default ProcessPageHeader
