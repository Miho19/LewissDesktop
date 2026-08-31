import { Blind } from '../blind/blind.types'
import { TableEntry } from '../tableEntry/TableEntry.types'
import { Cost } from './Cost.types'
import { Customer } from './Customer.types'

export type Worksheet = {
  blindType: Blind
  customer: Customer
  worksheetCost: Cost
  tableEntryList: TableEntry[]
}
