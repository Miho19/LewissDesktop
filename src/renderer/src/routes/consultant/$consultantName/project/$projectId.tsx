import { createFileRoute } from '@tanstack/react-router'
import Project from '@/pages/consultant/project'

export const Route = createFileRoute('/consultant/$consultantName/project/$projectId')({
  component: Project
})
