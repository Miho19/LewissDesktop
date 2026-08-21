import { useQuery } from '@tanstack/react-query'

function GETStaffListQuery() {
  return useQuery({
    queryKey: ['staff list'],
    queryFn: async () => {
      const response = await window.api.getStaffList()
    }
  })
}

export default GETStaffListQuery
