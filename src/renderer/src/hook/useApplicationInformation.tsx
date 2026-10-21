import { useQuery } from '@tanstack/react-query'

function useApplicationInformation() {
  return useQuery({
    queryKey: ['application information'],
    queryFn: async () => await window.api.getApplicationInformation()
  })
}

export default useApplicationInformation
