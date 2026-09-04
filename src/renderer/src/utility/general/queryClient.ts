import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: 'always',
      refetchOnWindowFocus: false
    },
    mutations: { networkMode: 'always' }
  }
})

export { queryClient }
