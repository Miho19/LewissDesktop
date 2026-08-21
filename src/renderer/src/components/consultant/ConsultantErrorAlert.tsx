import { AlertTriangleIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'

type Props = {
  error: Error
}
function ConsultantErrorAlert(props: Props) {
  const { error } = props

  return (
    <Alert>
      <AlertTriangleIcon />
      <AlertTitle>Consultant request failed.</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
  )
}

export default ConsultantErrorAlert
