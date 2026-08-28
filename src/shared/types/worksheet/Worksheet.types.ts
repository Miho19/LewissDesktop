import { Blind } from '../blind/blind.types'
import { ProjectFile } from '../Project.types'
import { TableEntry } from '../tableEntry/TableEntry.types'
import { WindowDisplay } from '../Window.types'
import { Cost } from './Cost.types'
import { Customer } from './Customer.types'

export type Worksheet = {
  blindType: Blind
  customer: Customer
  worksheetCost: Cost
  tableEntryList: TableEntry[]
}

export type CreateWorksheetFn = (
  blindType: Blind,
  windowDisplayList: WindowDisplay[],
  file: ProjectFile
) => Promise<Worksheet | undefined>
