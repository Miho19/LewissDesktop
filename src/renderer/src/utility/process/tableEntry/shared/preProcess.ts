import { preProcessKineticsRoller } from '@/utility/process/tableEntry/kineticsRoller'
import { Blind } from '@shared/types/blind/blind.types'
import { ProjectFile } from '@shared/types/Project.types'
import { WindowTableEntry, PreProcessFn } from '@shared/types/WindowTableForm.types'

function noPreProcess(_blindType: Blind, windowTableEntry: WindowTableEntry[], _file: ProjectFile) {
  return [...windowTableEntry]
}

const preProcessFunctionMap: Record<Blind, PreProcessFn> = {
  'Kinetics 10mm Cellular Blind': noPreProcess,
  'Kinetics 20mm Cellular Blind': noPreProcess,

  'Kinetics Sunscreen Roller Blind': preProcessKineticsRoller,
  'Kinetics Blockout Roller Blind': preProcessKineticsRoller,
  'Kinetics Light Filtering Roller Blind': preProcessKineticsRoller,

  "Lewis's 25mm Aluminium Venetian": noPreProcess,
  "Lewis's 50mm Aluminium Venetian": noPreProcess,
  "Lewis's 50mm Fauxwood Venetian": noPreProcess,
  "Lewis's 63mm Fauxwood Venetian": noPreProcess,
  "Lewis's 50mm Phoenixwood Venetian": noPreProcess,
  "Lewis's 63mm Phoenixwood Venetian": noPreProcess,

  'Kinetics Mikronwood 50mm Venetian': noPreProcess,

  'Santa Fe Woodlore Shutter': noPreProcess,
  'Santa Fe Woodlore Plus Shutter': noPreProcess,
  'Santa Fe Waterproof Woodlore Plus Shutter': noPreProcess,
  'Santa Fe Normandy Shutter': noPreProcess,

  'Roman Blind': noPreProcess,
  'Separate Lining': noPreProcess,
  'Unlined Curtain': noPreProcess,
  'Lined Curtain': noPreProcess,
  'Sheer Curtain': noPreProcess,
  'Interlined Curtain': noPreProcess
}

export function preProcessAsync(windowTableEntryList: WindowTableEntry[], file: ProjectFile) {
  const blindType = windowTableEntryList[0].blindType
  const preProcessFunction = preProcessFunctionMap[blindType]
  if (typeof preProcessFunction === 'undefined')
    throw new Error(`${blindType} does not have a pre process function`)

  const updatedList = preProcessFunction(blindType, structuredClone(windowTableEntryList), file)

  return updatedList
}
