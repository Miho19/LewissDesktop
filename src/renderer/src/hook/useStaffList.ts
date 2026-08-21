import { useQuery } from '@tanstack/react-query'

function useStaffList() {
  return useQuery({
    queryKey: ['staff list'],
    queryFn: async () => {
      const response = await window.api.getStaffList()
      return response
    }
  })
}

export default useStaffList
