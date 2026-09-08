import { WindowDisplay } from '@shared/types/Window.types'
import { Blind } from '@shared/types/blind/blind.types'
import { TableEntry } from '../tableEntry/TableEntry.types'
import { Cost, Extra } from './Cost.types'
import { Customer } from './Customer.types'
import { ProjectFile } from '@shared/types/Project.types'

export type Worksheet = {
  blindType: Blind
  customer: Customer
  worksheetCost: Cost
  tableEntryList: TableEntry[]
}

export type GetWorksheetExtraCostFn = (
  blindType: Blind,
  tableEntryList: TableEntry[],
  windowDisplayList: WindowDisplay[],
  file: ProjectFile
) => Promise<Extra[] | undefined>
