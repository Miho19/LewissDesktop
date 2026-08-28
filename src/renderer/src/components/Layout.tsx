import { ReactNode } from 'react'
import { SidebarInset, SidebarProvider, SidebarTrigger } from './ui/sidebar'
import AppSidebar from './sidebar/AppSidebar'
import { Toaster } from '@/components/ui/sonner'

type Props = {
  children: ReactNode
}

function Layout(props: Props) {
  const { children } = props

  return (
    <SidebarProvider className="dark bg-background text-foreground font-sans">
      <AppSidebar />
      <SidebarInset className="flex flex-col flex-1 bg-background">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
        <Toaster
          position="bottom-right"
          visibleToasts={3}
          theme="dark"
          duration={10000}
          closeButton
        />
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Layout
