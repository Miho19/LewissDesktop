import { useQuery } from '@tanstack/react-query'

function useFolder(folderId: string) {
  return useQuery({
    queryKey: [`folder ${folderId}`],
    queryFn: async () => await window.api.getFolder(folderId)
  })
}

export default useFolder
