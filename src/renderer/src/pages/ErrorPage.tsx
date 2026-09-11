import Layout from '@/components/Layout'
import { toast } from 'sonner'

type Props = {
  error?: Error
}
function ErrorPage(props: Props) {
  const { error } = props

  toast.error(error?.name, {
    id: 'page error',
    description: <p>{error?.message}</p>
  })

  return (
    <Layout>
      <div className="w-full h-full flex flex-col p-6 gap-8"></div>
    </Layout>
  )
}

export default ErrorPage
