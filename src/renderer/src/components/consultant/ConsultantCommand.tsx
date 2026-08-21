import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Spinner } from '../ui/spinner'

import ConsultantErrorAlert from './ConsultantErrorAlert'
import useStaffList from '@/hook/useStaffList'
import { useNavigate } from '@tanstack/react-router'

function ConsultantCommand() {
  const navigate = useNavigate()
  const { data, isLoading, isPending, isError, error } = useStaffList()
  if (isLoading || isPending) return <Spinner />
  if (isError) return <ConsultantErrorAlert error={error} />

  const filteredList = data.consultants.filter((c) => c.functions.includes('Consultant'))

  const consultantList = filteredList.map((c) => (
    <CommandItem
      key={c.name}
      onSelect={() => navigate({ to: '/$param', params: { param: c.name } })}
    >
      {c.name}
    </CommandItem>
  ))

  return (
    <div className="flex flex-col space-y-2 rounded-xl border p-4 shadow-sm max-w-md bg-popover text-popover-foreground">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">
        Select a consultant
      </span>
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Search" />
        <CommandList className="mt-2">
          <CommandEmpty>No results found.</CommandEmpty>
          {consultantList}
        </CommandList>
      </Command>
    </div>
  )
}

export default ConsultantCommand
