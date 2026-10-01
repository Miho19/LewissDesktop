import FabricItem from '@/components/spec/FabricItem'
import KineticsCellularSpecSheet from '@/components/spec/KineticsCellularSpecSheet'
import { Blind } from '@shared/types/blind/blind.types'
import { Spec } from '@shared/types/spec/Spec.types'

type Props = {
  blindType: Blind
  spec: Spec
}

function SpecFactory(props: Props) {
  const { blindType, spec } = props

  const { fabric } = spec
  if (fabric == null) return <></>

  const specContent = getSpecContent(blindType, spec)

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <FabricItem fabric={fabric} />
      {specContent}
    </div>
  )
}

function getSpecContent(blindType: Blind, spec: Spec) {
  switch (blindType) {
    case 'Kinetics 10mm Cellular Blind':
    case 'Kinetics 20mm Cellular Blind':
      return <KineticsCellularSpecSheet blindType={blindType} spec={spec} />

    default:
      return <div></div>
  }
}

export default SpecFactory
