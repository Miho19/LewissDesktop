import { createFileRoute } from '@tanstack/react-router'
import Project from '@/pages/Project'

export const Route = createFileRoute('/consultant/$consultantName/project/$projectId')({
  component: Project
})
