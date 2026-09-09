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
import { FolderItem } from '@shared/types/Folder.types'
import { Consultant } from '@shared/types/Consultant.types'
import { toast } from 'sonner'

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

  if (isErrorStaffList) return errorToast(errorStafflist)
  if (isErrorRoot) return errorToast(errorRoot)

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

  if (typeof payload === 'undefined') {
    console.log(`${consultantName} ${folderId}`)
  }

  return (
    <SidebarMenuItem key={consultantName}>
      <SidebarMenuButton>
        <Link
          to={`/consultant/$consultantName`}
          params={{ consultantName: consultantName }}
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

function errorToast(error: Error) {
  toast.error('Error', {
    description: (
      <>
        <p>{error.name}</p>
        <p>{error.message}</p>
      </>
    )
  })
  return <div className="w-full"></div>
}

export default ConsultantList
