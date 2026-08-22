import { useLocation } from '@tanstack/react-router'
import { ReactNode } from 'react'
import { SidebarProvider, SidebarTrigger } from './ui/sidebar'
import ApplicationSidebar from './sidebar/ApplicationSidebar'

type Props = {
  children: ReactNode
}

function Layout(props: Props) {
  const { children } = props
  const location = useLocation()

  return (
    <div className="h-screen w-screen dark bg-background font-sans flex flex-col text-foreground overflow-hidden">
      <SidebarProvider>
        <ApplicationSidebar />
        <main className="flex-1 overflow-hidden">
          <SidebarTrigger />
          <div className="container p-6 h-full">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  )
}

export default Layout
