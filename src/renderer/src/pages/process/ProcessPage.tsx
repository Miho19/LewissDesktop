import { useParams } from '@tanstack/react-router'

function ProcessPage() {
  const { fileId } = useParams({ from: '/process/$fileId' })

  return <div className="w-full h-full flex flex-col p-6 gap-8 items-center">{fileId}</div>
}

export default ProcessPage
