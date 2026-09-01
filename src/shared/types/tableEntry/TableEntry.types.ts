import { Blind } from '../blind/blind.types'
import { ProjectFile, Room, WindowMeasurement } from '../Project.types'
import { WindowDisplay } from '../Window.types'
import { KineticsCellularTableEntry } from './kineticsCellular.types'
import { KineticsMikronwoodTableEntry } from './kineticsMikronwood.types'
import { KineticsRollerTableEntry } from './kineticsRoller.types'
import { SantaFeShutterTableEntry } from './santaFeShutter.types'
import {
  LewissAluminiumTableEntry,
  LewissFauxwoodTableEntry,
  LewissPhoenixwoodTableEntry
} from './venetian.types'

export type KineticsTableEntry = KineticsCellularTableEntry | KineticsRollerTableEntry

export type VenetianTableEntry =
  | LewissAluminiumTableEntry
  | LewissFauxwoodTableEntry
  | LewissPhoenixwoodTableEntry
  | KineticsMikronwoodTableEntry

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
