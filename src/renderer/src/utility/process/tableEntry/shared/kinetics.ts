import { isKineticsTableEntryList } from '@shared/types/tableEntry/kinetics'
import { KineticsTableEntry, TableEntry } from '@shared/types/tableEntry/TableEntry.types'

function getMaxRemote(entries: KineticsTableEntry[]) {
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
  return entries.filter((e) => e.control === 'Lithium-ion')
}

function filterForRoomName(location: string, entries: KineticsTableEntry[]) {
  const roomName = getRoomName(location)
  return entries.filter((e) => getRoomName(e.location) === roomName)
}

export function getRemoteAndChannel(location: string, control: string, entries: TableEntry[]) {
  if (!isKineticsTableEntryList(entries)) throw new Error('Incorrect table entry type')

  const result = { remote: 0, channel: 0 }
  if (control !== 'Lithium-ion') return result

  const roomEntryList = filterForRoomName(location, entries)
  const motorisedRoomEntryList = filterForMotorisation(roomEntryList)

  const maxRemote = getMaxRemote(entries)
  if (motorisedRoomEntryList.length === 0) return { remote: maxRemote + 1, channel: 1 }

  const maxChannel = getMaxChannel(motorisedRoomEntryList)

  return { remote: motorisedRoomEntryList[0].remote, channel: maxChannel + 1 }
}
