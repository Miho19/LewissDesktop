import { createFileRoute } from '@tanstack/react-router'
import Consultant from '@/pages/consultant/Consultant'

export const Route = createFileRoute('/consultant/$consultantName/')({
  component: Consultant
})
