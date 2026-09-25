import FabricItem from '@/components/spec/FabricItem'
import { getBlindTypeFromSpec } from '@/utility/process/worksheet/getBlindTypeFromSpec'
import { Spec } from '@shared/types/spec/Spec.types'

type Props = {
  spec: Spec
}

function SpecFactory(props: Props) {
  const { spec } = props

  const blindType = getBlindTypeFromSpec(spec)
  if (typeof blindType === 'undefined') return <></>

  const { fabric } = spec
  if (fabric == null) return <></>

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <FabricItem fabric={fabric} />
    </div>
  )
}

export default SpecFactory
