import { Spinner } from '@/components/ui/spinner'
import { mapProcessFileLineListToBlindType } from '@/utility/process/windowTableEntry/getWindowTableEntryList'
import { Blind } from '@shared/types/blind/blind.types'
import { Line, ProcessFile } from '@shared/types/process/Process.types'
import { WindowTableEntry } from '@shared/types/WindowTableEntry.types'
import { Suspense } from 'react'

// getWindowTableEntryListAsync

type Props = {
  file: ProcessFile
  startProcess: (windowTableEntryList: WindowTableEntry[]) => void
}
function ProcessPageForm(props: Props) {
  const { file } = props
  const map = mapProcessFileLineListToBlindType(file)

  async function onSubmitHandler(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return <form onSubmit={onSubmitHandler}></form>
}

function getTableList(map: Map<Blind, Line[]>, file: ProcessFile) {
  return map.entries().map(([blindType, lineList]) => {
    return <Suspense fallback={TableFallBack(blindType)}></Suspense>
  })
}

function TableFallBack(blindType: Blind) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <Spinner />
    </div>
  )
}

export default ProcessPageForm

// const {
//   data: initialTableData,
//   error,
//   isFetching
// } = useSuspenseQuery<WindowTableEntry[]>({
//   queryKey: [`${blindType}`, `${file.reference}`],
//   queryFn: async () => await getWindowTableEntryList(blindType, windowDisplayList, file)
// })

// const [data, setData] = useState(initialTableData)

//   function getWindowTableFormList(
//   map: Map<Blind, WindowDisplay[]>,
//   file: ProjectFile,
//   openSheet: (WindowTableEntryList: WindowTableEntry[]) => void
// ) {
//   return [...map.entries()].map(([key, value]) => {
//     return (
//       <Suspense fallback={<WindowTableLoading />} key={`${key}${file.id}`}>
//         <WindowFormTable
//           blindType={key}
//           windowDisplayList={value}
//           file={file}
//           openSheet={openSheet}
//           toastMessage={toastWindowTableForm}
//         />
//       </Suspense>
//     )
//   })
// }
