import { ProcessFile } from '@shared/types/process/Process.types'
import { WindowTableEntry } from '@shared/types/WindowTableEntry.types'

// getWindowTableEntryListAsync

type Props = {
  file: ProcessFile
  startProcess: (windowTableEntryList: WindowTableEntry[]) => void
}
function ProcessPageForm(props: Props) {
  const { file } = props

  return <form></form>
}

export default ProcessPageForm
