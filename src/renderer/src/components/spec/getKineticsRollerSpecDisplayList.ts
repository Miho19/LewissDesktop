import {
  getKineticsRollerControl,
  getKineticsRollerPelmet
} from '@/utility/process/tableEntry/kineticsRoller'
import { Blind } from '@shared/types/blind/blind.types'
import { isKineticsRollerSpec } from '@shared/types/spec/kineticsRoller.types'
import { Spec, SpecDisplayList } from '@shared/types/spec/Spec.types'

export function getKineticsRollerSpecDisplayList(blindType: Blind, spec: Spec) {
  if (!isKineticsRollerSpec(spec)) return []

  const opacity = getOpacity(blindType)
  const control = getKineticsRollerControl(spec)

  const { rollDirection, bracketColour, bottomRailType, bottomRailColour, pelmetType } = spec

  const displayList: SpecDisplayList[] = [
    { title: 'Opacity', description: opacity },
    { title: 'Control', description: control },
    { title: 'Roll Direction', description: rollDirection },
    { title: 'Bracket Colour', description: bracketColour },
    { title: 'Bottom Rail', description: `${bottomRailType} - ${bottomRailColour}` }
  ]

  const pelmet = getKineticsRollerPelmet(pelmetType)
  if (pelmet.trim().length !== 0) displayList.push({ title: 'Pelmet', description: pelmet })

  return displayList
}

function getOpacity(blindType: Blind) {
  switch (blindType) {
    case 'Kinetics Blockout Roller Blind':
      return 'Blockout'
    case 'Kinetics Light Filtering Roller Blind':
      return 'Light Filtering'
    case 'Kinetics Sunscreen Roller Blind':
      return 'Sunscreen'
    default:
      return 'Invalid opacity'
  }
}
