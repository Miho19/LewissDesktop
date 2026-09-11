import { retrievePricingScheduleAsync } from '@/utility/process/pricingSchedule/retrievePricingSchedule'
import { getSantaFeAccessoryCost } from '@/utility/process/tableEntry/santaFeShutter'
import { Blind } from '@shared/types/blind/blind.types'
import { SantaFeShutterBlindOptions } from '@shared/types/blind/santaFe.types'
import {
  isSantaFeShutterPricingSchedule,
  SantaFeShutterPricingSchedule
} from '@shared/types/pricing/santaFeShutter.types'
import { ProjectFile } from '@shared/types/Project.types'
import { isSantaFeShutterSpec } from '@shared/types/spec/santaFe.types'
import { isSantaFeShutterTableEntryList } from '@shared/types/tableEntry/santaFeShutter.types'
import { TableEntry } from '@shared/types/tableEntry/TableEntry.types'
import { WindowDisplay } from '@shared/types/Window.types'
import { Extra } from '@shared/types/worksheet/Cost.types'

export async function getSantaFeShutterWorksheetExtraCostAsync(
  blindType: Blind,
  tableEntryList: TableEntry[],
  windowDisplayList: WindowDisplay[],
  file: ProjectFile
) {
  if (!isSantaFeShutterBlindType(blindType)) return undefined
  if (!isSantaFeShutterTableEntryList(tableEntryList)) return undefined

  const pricingSchedule = await retrievePricingScheduleAsync(blindType)
  if (!isSantaFeShutterPricingSchedule(pricingSchedule)) return undefined

  const output: Extra[] = []

  const premiumColourExtra = getPremiumColourExtra(windowDisplayList, pricingSchedule)
  if (typeof premiumColourExtra !== 'undefined') output.push(premiumColourExtra)

  const remoteExtra = getAccessoryExtra(
    'smartDialRemote',
    'remote',
    windowDisplayList,
    pricingSchedule
  )

  if (typeof remoteExtra !== 'undefined') output.push(remoteExtra)

  const chargerExtra = getAccessoryExtra(
    'usbChargingCable',
    'charger',
    windowDisplayList,
    pricingSchedule
  )
  if (typeof chargerExtra !== 'undefined') output.push(chargerExtra)

  const smartHubExtra = getAccessoryExtra('shadeAutoHub', 'hub', windowDisplayList, pricingSchedule)
  if (typeof smartHubExtra !== 'undefined') output.push(smartHubExtra)

  return output
}

function isSantaFeShutterBlindType(blindType: Blind) {
  const set = new Set<string>(SantaFeShutterBlindOptions)
  return set.has(blindType)
}

function getPremiumColourExtra(
  windowDisplayList: WindowDisplay[],
  pricingSchedule: SantaFeShutterPricingSchedule
) {
  const premiumCount = windowDisplayList.reduce((acc, curr) => {
    const { spec } = curr

    if (!isSantaFeShutterSpec(spec)) return acc

    const { fabric } = spec
    const { premium } = fabric

    if (premium == null) return acc
    if (!premium) return acc

    return acc + 1
  }, 0)

  if (premiumCount === 0) return undefined

  const found = pricingSchedule.premiumColour.find((pc) => pc.id === 'designerColour')
  if (typeof found === 'undefined') return undefined

  const extra: Extra = {
    name: found.name,
    quantity: premiumCount,
    cost: found.cost
  }

  return extra
}

function getAccessoryExtra(
  propertyName: string,
  accessoryId: string,
  windowDisplayList: WindowDisplay[],
  pricingSchedule: SantaFeShutterPricingSchedule
) {
  const count = getCount(propertyName, windowDisplayList)
  if (count === 0) return undefined

  const accessoryCost = getSantaFeAccessoryCost(accessoryId, pricingSchedule)
  if (typeof accessoryCost === 'undefined') return undefined

  const extra: Extra = {
    name: accessoryCost.name,
    quantity: count,
    cost: accessoryCost.cost
  }

  return extra
}

function getCount(propertyName: string, windowDisplayList: WindowDisplay[]) {
  const count = windowDisplayList.reduce((acc, curr) => {
    const { spec } = curr

    if (!isSantaFeShutterSpec(spec)) return acc

    const property = spec[propertyName]
    if (typeof property === 'undefined') return acc

    if (typeof property !== 'boolean') return acc

    if (!property) return acc

    return acc + 1
  }, 0)

  return count
}

//   shadeAutoHub: boolean
