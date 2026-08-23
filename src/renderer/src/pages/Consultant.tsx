import { useNavigate, useParams, useRouterState } from '@tanstack/react-router'
import { Skeleton } from '@/components/ui/skeleton'
import useFolder from '../hook/useFolder'

function Consultant() {
  const { param } = useParams({ from: '/$param' })
  const state = useRouterState({ select: (s) => s.location.state })
  const { folderId } = state.consultantFolder

  const { data, isPending, isLoading, isError, error } = useFolder(folderId)

  if (isPending || isLoading) return <RootFolderLoadingSkeleton />
  if (isError) return <div>{error.message}</div>

  const items = data.map((i) => <p key={i.id}>{i.name}</p>)

  return (
    <div className="h-full flex flex-col justify-between items-start">
      <h1>{param}</h1>
      <h2>folder: {folderId}</h2>
      <div className="flex flex-col gap-2">{items}</div>
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
