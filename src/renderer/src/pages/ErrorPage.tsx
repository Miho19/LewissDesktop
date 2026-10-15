import Layout from '@/components/Layout'
import { Button } from '@/components/ui/button'
import { ErrorComponentProps } from '@tanstack/react-router'
import { toast } from 'sonner'

function ErrorPage(props: ErrorComponentProps) {
  const { error, reset } = props

  const errorObject = error instanceof Error ? error : new Error(String(error))

  toast.error(errorObject.name, {
    id: 'page error',
    description: <p className="text-foreground bg-background">{errorObject.message}</p>
  })

  return (
    <Layout>
      <div className="w-full h-full flex flex-col p-6 gap-8">
        <Button onClick={() => reset()}>Try Again</Button>
      </div>
    </Layout>
  )
}

export default ErrorPage
