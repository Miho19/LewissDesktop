import ConsultantAvatar from '@/components/applicationInformation/ConsultantAvatar'
import { Skeleton } from '@/components/ui/skeleton'
import useApplicationInformation from '@/hook/useApplicationInformation'
import { toast } from 'sonner'

function UsernameAvatar() {
  const { data, isPending, isLoading, isError, error } = useApplicationInformation()

  if (isPending || isLoading) return <AppHeaderSkeleton />

  if (isError) return errorToast(error)

  const { userName } = data

  return (
    <div className="w-full flex gap-4 justify-end h-full items-center">
      <ConsultantAvatar name={userName} />
    </div>
  )
}

function AppHeaderSkeleton() {
  return (
    <div className="w-full flex flex-col p-6 gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  )
}

function errorToast(error: Error) {
  toast.error('Application Header', {
    id: 'app-header',
    description: (
      <>
        <p>{error.name}</p>
        <p>{error.message}</p>
      </>
    )
  })
  return <div className="w-full"></div>
}

export default UsernameAvatar
