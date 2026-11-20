import CustomerHeader from '@/components/processPageHeader/CustomerHeader'
import WorksheetHeader from '@/components/processPageHeader/worksheetHeader'
import { ProcessFile } from '@shared/types/process/Process.types'

type Props = {
  file: ProcessFile
}

function ProcessPageHeader(props: Props) {
  const { file } = props
  const { customer } = file

  return (
    <div className="flex flex-col w-full gap-8">
      <CustomerHeader {...customer} />
      <WorksheetHeader {...file} />
    </div>
  )
}

export default ProcessPageHeader
