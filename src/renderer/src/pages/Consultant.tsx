import { useParams } from '@tanstack/react-router'

function Consultant() {
  const { param } = useParams({ from: '/$param' })

  return (
    <div className="h-full flex items-center justify-center">
      <h1>{param}</h1>
    </div>
  )
}

export default Consultant
