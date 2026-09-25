import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'

type Props = {
  isSubmitPending: boolean
  selectedRowsString: string
}

function WindowTableFooter(props: Props) {
  const { isSubmitPending, selectedRowsString } = props
  return (
    <CardFooter className="p-6 flex justify-between bg-card items-center">
      <div className="w-full">{selectedRowsString}</div>
      <Button variant="default" type="submit" disabled={isSubmitPending}>
        {isSubmitPending && <Spinner />}
        Submit
      </Button>
    </CardFooter>
  )
}

export default WindowTableFooter
