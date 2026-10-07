import { useParams, useRouterState } from '@tanstack/react-router'
import useFolder from '@/hook/useFolder'
import FileList from '@/components/fileList/FileList'
import { Spinner } from '@/components/ui/spinner'
import ConsultantAvatar from '@/components/consultantAvatar/ConsultantAvatar'

function Consultant() {
  const { consultantName } = useParams({ from: '/consultant/$consultantName/' })
  const { consultantFolder } = useRouterState({ select: (s) => s.location.state })
  const folderId = consultantFolder?.folderId ?? '' // not sure why but when navigating away from this page, this becomes undefined

  const { data, isPending, isLoading, isError, error } = useFolder(folderId)

  if (isPending || isLoading) return <RootFolderLoading />
  if (isError)
    return (
      <div className="w-full h-full flex flex-col">
        <h1 className="text-sm ">{error.message}</h1>
      </div>
    )

  const filtered = data.filter((i) => i.isFile)

  return (
    <div className="w-full h-full flex flex-col p-6 gap-8 items-center">
      <div className="flex w-full justify-end focus:outline-none gap-4 items-center">
        <ConsultantAvatar name={consultantName} />
      </div>

      <FileList folder={filtered} />
    </div>
  )
}

export default Consultant

function RootFolderLoading() {
  return (
    <div className="w-full h-full items-center justify-center flex flex-col p-6 gap-2">
      <Spinner />
    </div>
  )
}
