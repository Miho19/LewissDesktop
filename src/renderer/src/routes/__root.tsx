import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Layout } from 'lucide-react'
import ErrorPage from '../pages/ErrorPage'

export const Route = createRootRoute({
  component: () => (
    <Layout>
      <Outlet></Outlet>
    </Layout>
  ),
  errorComponent: ErrorPage
})
