import { KineticsCellularBlind, KineticsRollerBlind } from './kinetics.types'
import { SantaFeShutterBlind } from './santaFe.types'
import { SantaFeVenetianBlind } from './venetian.types'

export type Blind =
  KineticsCellularBlind | KineticsRollerBlind | SantaFeVenetianBlind | SantaFeShutterBlind
