import ProcessPage from '@/pages/process/ProcessPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/process/$fileId')({
  component: ProcessPage
})
