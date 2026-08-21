import { useLocation } from '@tanstack/react-router'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

function Layout(props: Props) {
  const { children } = props
  const location = useLocation()

  return (
    <div className="h-screen dark bg-background flex flex-col text-foreground">
      <main className="flex-1 overflow-auto">
        <div className="container p-6 h-full">{children}</div>
      </main>
    </div>
  )
}

export default Layout
