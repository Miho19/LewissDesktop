import { useLocation } from '@tanstack/react-router'
import { ReactNode } from 'react'
import { SidebarProvider, SidebarTrigger } from './ui/sidebar'
import AppSidebar from './sidebar/AppSidebar'

type Props = {
  children: ReactNode
}

function Layout(props: Props) {
  const { children } = props
  const location = useLocation()

  return (
    <SidebarProvider>
      <div className="h-screen w-screen dark bg-background font-sans text-foreground overflow-hidden flex">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto p-6 no-scrollbar bg-background">
          <div className="container p-6 h-full">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Layout
