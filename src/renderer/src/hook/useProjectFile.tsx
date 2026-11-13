import { useQuery } from '@tanstack/react-query'

function useProjectFile(fileId: string) {
  return useQuery({
    queryKey: ['projectFile', `${fileId}`],
    queryFn: async () => await window.api.getProjectFile(fileId),
    enabled: !!fileId
  })
}

export default useProjectFile
