import { kineticsCellularWindowTableColumnDefinition } from '@/components/windowTable/utility/columnDefinitions/kineticsCellular'
import { windowTableColumnBase } from '@/components/windowTable/utility/columnDefinitions/defaultDefinition'
import { Blind } from '@shared/types/blind/blind.types'
import { kineticsRollerWindowTableColumnDefinition } from '@/components/windowTable/utility/columnDefinitions/kineticsRoller'
import { kineticsMikronwoodWindowTableColumnDefinition } from '@/components/windowTable/utility/columnDefinitions/kineticsMikronwood'
import {
  LewissAluminiumWindowTableColumnDefinition,
  LewissFauxwoodWindowTableColumnDefinition,
  LewissPhoenixwoodWindowTableColumnDefinition
} from '@/components/windowTable/utility/columnDefinitions/venetian'
import { SantaFeShutterWindowTableColumnDefinition } from '@/components/windowTable/utility/columnDefinitions/santaFeShutter'
import { capitalise } from '@/utility/general/capitalise'
import { SelectGroup, SelectItem, SelectLabel } from '@/components/ui/select'
import {
  kineticsRollerBracketColourOption,
  kineticsRollerBracketSizeOption
} from '@shared/types/WindowTableForm.types'

export * from './kineticsCellular'
export * from './kineticsRoller'
export * from './kineticsMikronwood'
export * from './santaFeShutter'
export * from './venetian'

export function getWindowFormTableColumnDefinition(blindType: Blind) {
  switch (blindType) {
    case 'Kinetics 10mm Cellular Blind':
    case 'Kinetics 20mm Cellular Blind':
      return kineticsCellularWindowTableColumnDefinition
    case 'Kinetics Blockout Roller Blind':
    case 'Kinetics Light Filtering Roller Blind':
    case 'Kinetics Sunscreen Roller Blind':
      return kineticsRollerWindowTableColumnDefinition
    case 'Kinetics Mikronwood 50mm Venetian':
      return kineticsMikronwoodWindowTableColumnDefinition

    case "Lewis's 25mm Aluminium Venetian":
    case "Lewis's 50mm Aluminium Venetian":
      return LewissAluminiumWindowTableColumnDefinition
    case "Lewis's 50mm Fauxwood Venetian":
    case "Lewis's 63mm Fauxwood Venetian":
      return LewissFauxwoodWindowTableColumnDefinition

    case "Lewis's 50mm Phoenixwood Venetian":
    case "Lewis's 63mm Phoenixwood Venetian":
      return LewissPhoenixwoodWindowTableColumnDefinition

    case 'Santa Fe Normandy Shutter':
    case 'Santa Fe Waterproof Woodlore Plus Shutter':
    case 'Santa Fe Woodlore Plus Shutter':
    case 'Santa Fe Woodlore Shutter':
      return SantaFeShutterWindowTableColumnDefinition
    default:
      return windowTableColumnBase
  }
}

// we are coupled to shadcn very heavily...
export function getSelectItemList(arr: readonly string[]) {
  return arr
    .map((option) => capitalise(option))
    .map((option) => <SelectItem value={option}>{option}</SelectItem>)
}

export function getKineticsRollerBracketSelectItemList() {
  const bracketColour = kineticsRollerBracketColourOption.map((colour) => capitalise(colour))
  const bracketSize = kineticsRollerBracketSizeOption.map((size) => capitalise(size))

  const output: React.JSX.Element[] = []

  for (const colour of bracketColour) {
    output.push(
      <SelectGroup>
        <SelectLabel>{colour}</SelectLabel>
        {bracketSize.map((size) => (
          <SelectItem value={getBracket(size, colour)}>{getBracket(size, colour)}</SelectItem>
        ))}
      </SelectGroup>
    )
  }

  return output
}

function getBracket(size: string, colour: string) {
  return `${size} - ${colour}`
}
