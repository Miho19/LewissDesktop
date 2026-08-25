import { useParams, useRouterState } from '@tanstack/react-router'
import useFolder from '@/hook/useFolder'
import ConsultantHeader from '@/components/consultant/ConsultantHeader'
import { FolderItem } from 'shared/types/Folder.types'
import FolderList from '@/components/consultant/FolderList'
import { Spinner } from '@/components/ui/spinner'

function Consultant() {
  const { consultantName } = useParams({ from: '/consultant/$consultantName/' })
  const state = useRouterState({ select: (s) => s.location.state })
  const { folderId } = state.consultantFolder

  const { data, isPending, isLoading, isError, error } = useFolder(folderId)

  if (isPending || isLoading) return <RootFolderLoading />
  if (isError) return <div>{error.message}</div>

  const filtered = data.filter((i) => i.isFile)

  return (
    <div className="w-full h-full flex flex-col rounded-md p-6 gap-8">
      <ConsultantHeader name={consultantName} />
      <FolderList folder={filtered} />
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

function getFileList(folder: FolderItem[]) {}
