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

  return (
    <div>
      {Object.values(file).map((s) => (
        <p>{s.toString()}</p>
      ))}
    </div>
  )
}

export default ProcessPageHeader
