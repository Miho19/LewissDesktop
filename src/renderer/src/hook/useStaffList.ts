import { useQuery } from '@tanstack/react-query'

function useStaffList() {
  return useQuery({
    queryKey: ['staff list'],
    queryFn: async () => await window.api.getStaffList()
  })
}

export default useStaffList
