import { Blind } from '../blind/blind.types'
import { ProjectFile, Room, WindowMeasurement } from '../Project.types'
import { WindowDisplay } from '../WindowDisplay.types'
import { KineticsCellularTableEntry } from './kineticsCellular.types'
import { KineticsMikronwoodTableEntry } from './kineticsMikronwood.types'
import { KineticsRollerTableEntry } from './kineticsRoller.types'
import { SantaFeShutterTableEntry } from './santaFeShutter.types'
import { LewissPhoenixwoodTableEntry } from './lewissPhoenixwood.types'
import { LewissAluminiumTableEntry } from '@shared/types/tableEntry/lewissAluminium.types'
import { LewissFauxwoodTableEntry } from '@shared/types/tableEntry/lewissFauxwood.types'

export type KineticsTableEntry =
  KineticsCellularTableEntry | KineticsRollerTableEntry | KineticsMikronwoodTableEntry

export type VenetianTableEntry =
  LewissAluminiumTableEntry | LewissFauxwoodTableEntry | LewissPhoenixwoodTableEntry

export type TableEntry = KineticsTableEntry | VenetianTableEntry | SantaFeShutterTableEntry

export type createTableEntryFn = (
  blindType: Blind,
  index: number,
  windowDisplay: WindowDisplay,
  room: Room,
  windowMeasurement: WindowMeasurement,
  entries: TableEntry[],
  file: ProjectFile
) => Promise<TableEntry[]>
