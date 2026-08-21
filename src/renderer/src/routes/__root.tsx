import { createRootRoute, Outlet } from '@tanstack/react-router'
import Layout from '../components/Layout'
import ErrorPage from '../pages/ErrorPage'

export const Route = createRootRoute({
  component: () => (
    <Layout>
      <Outlet></Outlet>
    </Layout>
  ),
  errorComponent: ErrorPage
})
