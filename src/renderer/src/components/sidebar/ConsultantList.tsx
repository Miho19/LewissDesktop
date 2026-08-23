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
import useFolder from '@/hook/useFolder'
import { FolderItem } from 'shared/types/Folder.types'
import { Consultant } from 'shared/types/Consultant.types'

function ConsultantList() {
  const {
    data: staffList,
    isPending: isPendingStaffList,
    isLoading: isLoadingStaffList,
    isError: isErrorStaffList,
    error: errorStafflist
  } = useStaffList()

  const {
    data: root,
    isPending: isPendingRoot,
    isLoading: isLoadingRoot,
    isError: isErrorRoot,
    error: errorRoot
  } = useFolder('root')

  if (isPendingStaffList || isLoadingStaffList) return <ConsultantListSkeleton />
  if (isPendingRoot || isLoadingRoot) return <ConsultantListSkeleton />

  if (isErrorStaffList) return <div>{errorStafflist.message}</div>
  if (isErrorRoot) return <div>{errorRoot.message}</div>

  const navigationList = getSidebarNavigationLink(staffList.consultants, root)

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

function getSidebarNavigationLink(consultantList: Consultant[], root: FolderItem[]) {
  const links = root.map((f) => {
    if (!f.isFolder) return []

    const consultant = consultantList.find(
      (c) => c.name.localeCompare(f.name, undefined, { sensitivity: 'base' }) === 0
    )

    if (typeof consultant === 'undefined') return []
    if (!consultant.functions.includes('Consultant')) return []

    return getSidebarNavigationComponent(consultant.name, f.id)
  })

  return links.flat()
}

function getSidebarNavigationComponent(consultantName: string, folderId: string) {
  const payload = { name: consultantName, folderId }

  return (
    <SidebarMenuItem key={consultantName}>
      <SidebarMenuButton>
        <Link
          to={`/$param`}
          params={{ param: consultantName }}
          className="flex w-full"
          activeOptions={{ exact: true }}
          activeProps={{ className: 'font-bold' }}
          state={{ consultantFolder: payload }}
        >
          {consultantName}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export default ConsultantList
