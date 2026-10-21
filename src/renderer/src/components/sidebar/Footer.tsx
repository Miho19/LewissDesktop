import { Link } from '@tanstack/react-router'
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import Logo from "@/assets/Lewis's White Text Logo.png"
import useApplicationInformation from '@/hook/useApplicationInformation'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'
function Footer() {
  const { data, isPending, isLoading, isError, error } = useApplicationInformation()

  if (isPending || isLoading)
    return (
      <div className="flex w-full justify-center items-center">
        <Spinner />
      </div>
    )

  if (isError) return errorToast(error)

  const { version } = data

  return (
    <SidebarFooter className="mb-6">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="p-8 aspect-square transition-all duration-300 ease-in-out hover:scale-105 hover:bg-transparent"
          >
            <Link to="/">
              <img src={Logo} alt="Lewis's Logo" className="invert dark:invert-0" />
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem className="w-full flex justify-center text-xs mt-4 text-muted-foreground">
          <span>{version}</span>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}

function errorToast(error: Error) {
  toast.error('Sidebar Footer', {
    id: 'sidebar-footer',
    description: (
      <>
        <p>{error.name}</p>
        <p>{error.message}</p>
      </>
    )
  })
  return <div className="w-full"></div>
}

export default Footer
