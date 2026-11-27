import ProcessPageTable from '@/components/processPageForm/ProcessPageTable'
import { Spinner } from '@/components/ui/spinner'
import { mapProcessFileLineListToBlindType } from '@/utility/process/windowTableEntry/getWindowTableEntryList'
import { Blind } from '@shared/types/blind/blind.types'
import { Line, ProcessFile } from '@shared/types/process/Process.types'
import { WindowTableEntry } from '@shared/types/WindowTableEntry.types'
import { Suspense, useRef } from 'react'

// getWindowTableEntryListAsync

type Props = {
  file: ProcessFile
  startProcess: (windowTableEntryList: WindowTableEntry[]) => void
}

export type ProcessTableRefHandler = {
  getData: () => WindowTableEntry[]
}

function ProcessPageForm(props: Props) {
  const { file } = props
  const tableRefList = useRef<Map<Blind, ProcessTableRefHandler>>(new Map())

  const map = mapProcessFileLineListToBlindType(file)

  async function onSubmitHandler(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const data: WindowTableEntry[] = []
    tableRefList.current.forEach((handle) => {
      data.push(...handle.getData())
    })
    console.log(data)
  }

  const tableList = getTableList(map, file, tableRefList)

  return <form onSubmit={onSubmitHandler}>{tableList}</form>
}

function getTableList(
  map: Map<Blind, Line[]>,
  file: ProcessFile,
  tableRefList: React.RefObject<Map<Blind, ProcessTableRefHandler>>
) {
  return map.entries().map(([blindType, lineList]) => {
    return (
      <Suspense
        fallback={TableFallBack(blindType)}
        key={`suspense process file table ${blindType} ${file.scheduleRef}`}
      >
        <ProcessPageTable
          ref={(handle) => {
            if (handle) {
              tableRefList.current.set(blindType, handle)
            }
            return () => {
              tableRefList.current.delete(blindType)
            }
          }}

          blindType={blindType}
          lineList={lineList}
          file={file}
          key={`process file table ${blindType} ${file.scheduleRef}`}
        />
      </Suspense>
    )
  })
}

function TableFallBack(blindType: Blind) {
  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center"
      key={`process page table fallback ${blindType}`}
    >
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
