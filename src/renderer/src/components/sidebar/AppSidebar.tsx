import { Sidebar, SidebarContent } from '@/components/ui/sidebar'

import MainNavigation from './MainNavigation'
import Footer from './Footer'
import ConsultantList from './ConsultantList'

function AppSidebar() {
  return (
    <Sidebar collapsible="none">
      <SidebarContent>
        <MainNavigation />
        <ConsultantList />
      </SidebarContent>
      <Footer />
    </Sidebar>
  )
}

export default AppSidebar
