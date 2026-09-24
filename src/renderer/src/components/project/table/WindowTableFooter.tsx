import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'

type Props = {
  isSubmitPending: boolean
}

function WindowTableFooter(props: Props) {
  const { isSubmitPending } = props
  return (
    <CardFooter className="p-6 flex justify-end bg-card">
      <Button variant="default" type="submit" disabled={isSubmitPending}>
        {isSubmitPending && <Spinner />}
        Submit
      </Button>
    </CardFooter>
  )
}

export default WindowTableFooter
