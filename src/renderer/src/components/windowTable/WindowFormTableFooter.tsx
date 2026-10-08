import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

type Props = {
  isSubmitPending: boolean
  numberOfSelectedRowsString: string
}

function WindowFormTableFooter(props: Props) {
  const { isSubmitPending, numberOfSelectedRowsString } = props
  return (
    <div className="w-full flex justify-between px-4">
      <p className="w-full text-sm text-muted-foreground">{numberOfSelectedRowsString}</p>
      <Button>{isSubmitPending && <Spinner />}Submit</Button>
    </div>
  )
}

export default WindowFormTableFooter
