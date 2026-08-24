import { useLocation } from '@tanstack/react-router'
import { ReactNode } from 'react'
import { SidebarProvider } from './ui/sidebar'
import AppSidebar from './sidebar/AppSidebar'

type Props = {
  children: ReactNode
}

function Layout(props: Props) {
  const { children } = props
  const location = useLocation()

  return (
    <SidebarProvider>
      <div className="h-screen w-screen dark bg-background font-sans text-foreground flex">
        <AppSidebar />
        <main className="flex-1 w-full h-full">
          <div className="p-6 h-full w-full">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Layout
