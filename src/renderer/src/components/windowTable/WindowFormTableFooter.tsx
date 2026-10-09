import { Button } from '@/components/ui/button'

type Props = {
  numberOfSelectedRowsString: string
}

function WindowFormTableFooter(props: Props) {
  const { isSubmitPending, numberOfSelectedRowsString } = props
  return (
    <div className="w-full flex justify-between px-4">
      <p className="w-full text-sm text-muted-foreground">{numberOfSelectedRowsString}</p>
      <Button type="submit" variant="default">
        Submit
      </Button>
    </div>
  )
}

export default WindowFormTableFooter
