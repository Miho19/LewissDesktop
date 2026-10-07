import { Avatar, AvatarFallback } from '@/components/ui/avatar'

type Props = {
  name: string
}
function ConsultantAvatar(props: Props) {
  const { name } = props
  const fallback = getFallback(name)

  return (
    <>
      <Avatar className="flex justify-between">
        <AvatarFallback className="w-8">{fallback}</AvatarFallback>
      </Avatar>
      <span className="text-md font-medium">{name}</span>
    </>
  )
}

function getFallback(name: string) {
  const split = name.split(' ')
  return `${split[0].charAt(0)} ${split[1].charAt(0)}`
}

export default ConsultantAvatar
