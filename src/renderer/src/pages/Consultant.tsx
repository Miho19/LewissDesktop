import { useParams, useRouterState } from '@tanstack/react-router'
import { Skeleton } from '@/components/ui/skeleton'
import useFolder from '../hook/useFolder'
import ConsultantHeader from '../components/consultant/ConsultantHeader'
import { FolderItem } from 'shared/types/Folder.types'
import FolderList from '../components/consultant/FolderList'

function Consultant() {
  const { param } = useParams({ from: '/$param' })
  const state = useRouterState({ select: (s) => s.location.state })
  const { folderId } = state.consultantFolder

  const { data, isPending, isLoading, isError, error } = useFolder(folderId)

  if (isPending || isLoading) return <RootFolderLoadingSkeleton />
  if (isError) return <div>{error.message}</div>

  const filtered = data.filter((i) => i.isFile)

  return (
    <div className="w-full h-full flex flex-col rounded-md p-6 gap-8">
      <ConsultantHeader name={param} />
      <FolderList folder={filtered} />
    </div>
  )
}

export default Consultant

function RootFolderLoadingSkeleton() {
  return (
    <div className="w-full flex flex-col p-6 gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  )
}

function getFileList(folder: FolderItem[]) {}
