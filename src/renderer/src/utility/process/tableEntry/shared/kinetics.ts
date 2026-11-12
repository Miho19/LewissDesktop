import { isKineticsTableEntry, isKineticsTableEntryList } from '@shared/types/tableEntry/kinetics'
import { KineticsTableEntry, TableEntry } from '@shared/types/tableEntry/TableEntry.types'
import { WindowTableEntry } from '@shared/types/WindowTableForm.types'

export function getMaxRemote(entries: KineticsTableEntry[]) {
  if (!isKineticsTableEntryList(entries)) throw new Error(`Type error`)
  const max = entries.reduce((max, curr) => (curr.remote > max ? curr.remote : max), 0)
  return max
}

function getMaxChannel(entries: KineticsTableEntry[]) {
  const max = entries.reduce((max, curr) => (curr.channel > max ? curr.channel : max), 0)
  return max
}

function getRoomName(location: string) {
  const locationSplit = location.split('-')
  return locationSplit[0].trim()
}

function filterForMotorisation(entries: KineticsTableEntry[]) {
  return entries.filter((e) => e.control.toLocaleLowerCase().includes('lithium-ion'))
}

function filterForRoomName(location: string, entries: KineticsTableEntry[]) {
  const roomName = getRoomName(location)
  return entries.filter((e) => getRoomName(e.location) === roomName)
}

export function getRemoteAndChannel(location: string, control: string, entries: TableEntry[]) {
  if (!isKineticsTableEntryList(entries)) throw new Error('Incorrect table entry type')

  const result = { remote: 0, channel: 0 }
  if (!control.toLocaleLowerCase().includes('lithium-ion')) return result

  const roomEntryList = filterForRoomName(location, entries)
  const motorisedRoomEntryList = filterForMotorisation(roomEntryList)

  const maxRemote = getMaxRemote(entries)
  if (motorisedRoomEntryList.length === 0) return { remote: maxRemote + 1, channel: 1 }

  const maxChannel = getMaxChannel(motorisedRoomEntryList)

  return { remote: motorisedRoomEntryList[0].remote, channel: maxChannel + 1 }
}

export function getKineticsUpdatedIndexPreProcessing(windowTableEntry: WindowTableEntry[]) {
  return windowTableEntry.map((wt, index) => {
    const adjustedIndex = index + 1
    wt.tableEntry.index = adjustedIndex
    return wt
  })
}

export function getKineticsUpdatedButtingPreProcessing(windowTableEntry: WindowTableEntry[]) {
  return windowTableEntry.map((wt) => {
    const currentTableEntry = wt.tableEntry
    if (!isKineticsTableEntry(currentTableEntry)) throw new Error(`Must be Kinetics Table Entry`)

    const currentButtingString = currentTableEntry.butting.toLocaleLowerCase().trim()

    if (
      currentButtingString.length === 0 ||
      currentButtingString.includes('rhs') ||
      currentButtingString.includes('to')
    )
      return wt

    const { toIndex } = splitKineticsButtingString(currentButtingString)

    const buttingBlind = getButtingBlind(toIndex, windowTableEntry)

    if (typeof buttingBlind === 'undefined') {
      currentTableEntry.butting = 'Error'
      return wt
    }

    const lhsIndex = currentTableEntry.index
    const rhsIndex = buttingBlind.tableEntry.index

    const lhsButtingString = getKineticsButtingString('LHS', rhsIndex)
    const rhsButtingString = getKineticsButtingString('RHS', lhsIndex)

    currentTableEntry.butting = lhsButtingString
    buttingBlind.tableEntry['butting'] = rhsButtingString

    return wt
  })
}

function getButtingBlind(toIndexLHS: string, windowTableEntry: WindowTableEntry[]) {
  return windowTableEntry.find((wt) => {
    const tableEntry = wt.tableEntry
    if (!isKineticsTableEntry(tableEntry)) throw new Error(`Must be a Kinetics Table Entry`)

    const queryButtingString = tableEntry.butting.toLocaleLowerCase().trim()
    if (
      queryButtingString.length === 0 ||
      queryButtingString.includes('lhs') ||
      queryButtingString.includes('to')
    )
      return false

    const { side: querySide, toIndex: queryIndex } = splitKineticsButtingString(queryButtingString)

    return queryIndex === toIndexLHS && querySide === 'rhs'
  })
}

function getKineticsButtingString(side: 'LHS' | 'RHS', index: number) {
  return side === 'LHS' ? `LHS to #${index}` : `RHS to #${index}`
}

function splitKineticsButtingString(butting: string) {
  const split = butting.split('/')

  return {
    side: split[0].toLocaleLowerCase().trim(),
    toIndex: split[1].toLocaleLowerCase().trim()
  }
}
