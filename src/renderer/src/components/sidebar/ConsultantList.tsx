import useStaffList from '@/hook/useStaffList'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '../ui/sidebar'
import { Link } from '@tanstack/react-router'
import { Skeleton } from '@/components/ui/skeleton'

function ConsultantList() {
  const { data, isPending, isLoading, isError, error } = useStaffList()

  if (isLoading || isPending) return ConsultantListSkeleton()
  if (isError) return <div>{error.message}</div>

  const filteredList = data.consultants.filter((c) => c.functions.includes('Consultant'))

  const navigationList = filteredList.map((c) => (
    <SidebarMenuItem key={c.name}>
      <SidebarMenuButton>
        <Link to={`/$param`} params={{ param: c.name }} className="flex w-full">
          {c.name}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Consultant</SidebarGroupLabel>
      <SidebarMenu>{navigationList}</SidebarMenu>
    </SidebarGroup>
  )
}

function ConsultantListSkeleton() {
  return (
    <div className="w-full flex flex-col p-6 gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  )
}

export default ConsultantList
