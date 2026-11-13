import { ProcessFile } from '@shared/types/process/Process.types'

type Props = {
  file: ProcessFile
}
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
