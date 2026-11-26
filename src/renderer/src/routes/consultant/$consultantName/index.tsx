import { createFileRoute } from '@tanstack/react-router'
import ConsultantPage from '@/pages/consultant/ConsultantPage'

export const Route = createFileRoute('/consultant/$consultantName/')({
  component: ConsultantPage
})
