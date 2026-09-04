import type { Blind } from '@shared/types/blind/blind.types'
import { AccessorySchedule } from '@shared/types/pricing/pricingSchedule.types'
import { GETProjectFileResponse } from '@shared/types/Project.types'

function getAccessoryScheduleEndpoint() {
  return new URL('', 'https://lewiss-measure-pro.netlify.app/.netlify/functions/graph')
}

function getAccessoryScheduleFetchOptions(fileId: string) {
  const fetchOptions: RequestInit = {
    method: 'POST',
    headers: {
      'content-Type': 'application/json'
    },
    body: JSON.stringify({
      action: 'downloadJson',
      itemId: fileId
    })
  }

  return fetchOptions
}

export async function GETAccessorySchedule(
  blindType: Blind,
  endpoint: URL = getAccessoryScheduleEndpoint()
) {
  try {
    const fileId = blindTypeToAccessoryScheduleId[blindType]
    if (typeof fileId === 'undefined') throw new Error(`${blindType} is an invalid blind type`)

    const fetchOptions = getAccessoryScheduleFetchOptions(fileId)

    const response = await fetch(endpoint, fetchOptions)
    if (!response.ok) throw new Error(response.statusText)

    const json: GETProjectFileResponse = await response.json()
    const jsonContent: AccessorySchedule = JSON.parse(json.content)
    return jsonContent
  } catch (error) {
    throw new Error(`fetch error accessory schedule ${blindType}`, { cause: error })
  }
}

const blindTypeToAccessoryScheduleId: Record<Blind, string> = {
  'Kinetics 10mm Cellular Blind': '01VFVMOADECMGAUDSXGVC2RRRUE62FC5XM',
  'Kinetics 20mm Cellular Blind': '01VFVMOADECMGAUDSXGVC2RRRUE62FC5XM',
  'Kinetics Sunscreen Roller Blind': '01VFVMOADECMGAUDSXGVC2RRRUE62FC5XM',
  'Kinetics Blockout Roller Blind': '01VFVMOADECMGAUDSXGVC2RRRUE62FC5XM',
  'Kinetics Light Filtering Roller Blind': '01VFVMOADECMGAUDSXGVC2RRRUE62FC5XM',
  "Lewis's 25mm Aluminium Venetian": '01VFVMOACRWWJGIMATOZFJLDTRSJM7AB7L',
  "Lewis's 50mm Aluminium Venetian": '01VFVMOACRWWJGIMATOZFJLDTRSJM7AB7L',
  "Lewis's 50mm Fauxwood Venetian": '01VFVMOACRWWJGIMATOZFJLDTRSJM7AB7L',
  "Lewis's 63mm Fauxwood Venetian": '01VFVMOACRWWJGIMATOZFJLDTRSJM7AB7L',
  "Lewis's 50mm Phoenixwood Venetian": '01VFVMOACRWWJGIMATOZFJLDTRSJM7AB7L',
  "Lewis's 63mm Phoenixwood Venetian": '01VFVMOACRWWJGIMATOZFJLDTRSJM7AB7L',
  'Kinetics Mikronwood 50mm Venetian': '01VFVMOADECMGAUDSXGVC2RRRUE62FC5XM',
  'Santa Fe Woodlore Shutter': '01VFVMOABVHGDAQQW3ANG3P6UPTMQPH3O6',
  'Santa Fe Woodlore Plus Shutter': '01VFVMOABVHGDAQQW3ANG3P6UPTMQPH3O6',
  'Santa Fe Waterproof Woodlore Plus Shutter': '01VFVMOABVHGDAQQW3ANG3P6UPTMQPH3O6',
  'Santa Fe Normandy Shutter': '01VFVMOABVHGDAQQW3ANG3P6UPTMQPH3O6'
}
