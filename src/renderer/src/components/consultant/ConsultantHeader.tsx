import { Avatar, AvatarFallback } from '@/components/ui/avatar'

type Props = {
  name: string
}
function ConsultantHeader(props: Props) {
  const { name } = props
  const fallback = getFallback(name)

  return (
    <div className="flex w-full justify-end focus:outline-none gap-4 items-center">
      <Avatar className="flex justify-between">
        <AvatarFallback className="w-8">{fallback}</AvatarFallback>
      </Avatar>
      <span className="text-md font-medium">{name}</span>
    </div>
  )
}

/**
 * Note that this will be somewhat incorrect when users with same initials
 * @param name
 *
 * @returns
 */
function getFallback(name: string) {
  const split = name.split(' ')
  return `${split[0].charAt(0)} ${split[1].charAt(0)}`
}

export default ConsultantHeader
