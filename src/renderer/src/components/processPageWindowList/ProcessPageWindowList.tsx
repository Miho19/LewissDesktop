import { ProcessFile } from '@shared/types/process/Process.types'
import { WindowTableEntry } from '@shared/types/WindowTableEntry.types'

type Props = {
  file: ProcessFile
  startProcess: (windowTableEntryList: WindowTableEntry[]) => void
}
function ProcessPageWindowList(props: Props) {
  const { file } = props
  return <div></div>
}

export default ProcessPageWindowList
