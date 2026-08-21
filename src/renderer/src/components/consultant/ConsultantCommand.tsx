import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Spinner } from '../ui/spinner'

import ConsultantErrorAlert from './ConsultantErrorAlert'
import { Link } from '@tanstack/react-router'
import useStaffList from '@/hook/useStaffList'

function ConsultantCommand() {
  const { data, isLoading, isPending, isError, error } = useStaffList()
  if (isLoading || isPending) return <Spinner />
  if (isError) return <ConsultantErrorAlert error={error} />

  const consultantList = data.consultants.map((c) => (
    <CommandItem key={c.name}>
      <Link to="/$param" params={{ param: c.name }}>
        {c.name}
      </Link>
    </CommandItem>
  ))

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Search" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {consultantList}
      </CommandList>
    </Command>
  )
}

export default ConsultantCommand

// <CommandItem asChild>
//   <Link href="/dashboard">Dashboard</Link>
// </CommandItem>
