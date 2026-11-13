import { useQuery } from '@tanstack/react-query'

function useProcessFile(fileId: string) {
  return useQuery({
    queryKey: ['processfile', `${fileId}`],
    queryFn: async () => await window.api.getProcessFile(fileId),
    enabled: !!fileId
  })
}

export default useProcessFile
