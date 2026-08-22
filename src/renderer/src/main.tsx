import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from './components/ui/tooltip'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: 'always',
      refetchOnWindowFocus: false
    },
    mutations: { networkMode: 'always' }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  </StrictMode>
)
