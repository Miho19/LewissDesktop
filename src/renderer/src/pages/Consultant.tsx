import { useNavigate, useParams } from '@tanstack/react-router'
import { Button } from '../components/ui/button'

function Consultant() {
  const { param } = useParams({ from: '/$param' })
  const navigate = useNavigate()

  return (
    <div className="h-full flex flex-col justify-between items-start">
      <h1>{param}</h1>
      <Button onClick={() => navigate({ to: '/' })}>Home</Button>
    </div>
  )
}

export default Consultant
