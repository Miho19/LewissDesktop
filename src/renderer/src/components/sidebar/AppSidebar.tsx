import { Sidebar, SidebarContent } from '@/components/ui/sidebar'

import MainNavigation from './MainNavigation'
import Footer from './Footer'
import ConsultantList from './ConsultantList'

function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarContent>
        <MainNavigation />
        <ConsultantList />
      </SidebarContent>
      <Footer />
    </Sidebar>
  )
}

export default AppSidebar
