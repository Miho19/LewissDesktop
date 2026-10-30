import { RomanBlind } from '@shared/types/blind/roman.types'
import { KineticsCellularBlind, KineticsRollerBlind } from './kinetics.types'
import { SantaFeShutterBlind } from './santaFe.types'
import { VenetianBlind } from './venetian.types'
import { Curtain } from '@shared/types/blind/curtain.types'

export type Blind =
  | KineticsCellularBlind
  | KineticsRollerBlind
  | VenetianBlind
  | SantaFeShutterBlind
  | RomanBlind
  | Curtain
