import { ReactNode } from 'react'
import { SidebarInset, SidebarProvider, SidebarTrigger } from './ui/sidebar'
import AppSidebar from './sidebar/AppSidebar'
import { Toaster } from '@/components/ui/sonner'
import { ScrollArea } from '@/components/ui/scroll-area'

type Props = {
  children: ReactNode
}

function Layout(props: Props) {
  const { children } = props

  return (
    <SidebarProvider className="select-none h-screen w-screen overflow-hidden">
      <AppSidebar />
      <SidebarInset className="flex flex-col h-full min-h-0 min-w-0 overflow-hidden">
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4 [app-region:drag]">
          <SidebarTrigger />
        </header>

        <main className="flex-1 min-h-0 w-full relative">
          <ScrollArea className="h-full w-full">
            <div className="p-6">{children}</div>
          </ScrollArea>
        </main>

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
