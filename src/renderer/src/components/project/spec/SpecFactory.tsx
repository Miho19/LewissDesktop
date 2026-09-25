import { getBlindTypeFromSpec } from '@/utility/process/worksheet/getBlindTypeFromSpec'
import { Spec } from '@shared/types/spec/Spec.types'

type Props = {
  spec: Spec
}
function SpecFactory(props: Props) {
  const { spec } = props

  const blindType = getBlindTypeFromSpec(spec)
  if (typeof blindType === 'undefined') return <></>

  return <div></div>
}

export default SpecFactory
