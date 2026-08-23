import { Link } from '@tanstack/react-router'
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import Logo from "@/assets/Lewis's White Text Logo.png"
function Footer() {
  return (
    <SidebarFooter className="mb-6">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="p-8 aspect-square transition-all duration-300 ease-in-out hover:scale-105 hover:bg-transparent"
          >
            <Link to="/">
              <img src={Logo} alt="Lewis's Logo" />
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}

export default Footer
