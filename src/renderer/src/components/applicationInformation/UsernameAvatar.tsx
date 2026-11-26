import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import useApplicationInformation from '@/hook/useApplicationInformation'
import { toast } from 'sonner'

function UsernameAvatar() {
  const { data, isPending, isLoading, isError, error } = useApplicationInformation()

  if (isPending || isLoading) return <AppHeaderSkeleton />

  if (isError) return errorToast(error)

  const { userName } = data

  const fallback = getFallback(userName)

  return (
    <div className="w-full flex gap-4 justify-end h-full items-center">
      <Avatar className="flex justify-between">
        <AvatarFallback className="w-8">{fallback}</AvatarFallback>
      </Avatar>
      <span className="text-md font-medium">{userName}</span>
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

function getFallback(name: string) {
  const split = name.split(' ')
  if (split.length >= 2) return `${split[0].charAt(0)} ${split[1].charAt(0)}`
  return `${split[0].charAt(0)}`
}

export default UsernameAvatar
