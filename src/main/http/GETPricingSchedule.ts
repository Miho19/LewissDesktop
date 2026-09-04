import { Blind } from '@shared/types/blind/blind.types'
import { PricingSchedule } from '@shared/types/pricing/pricingSchedule.types'
import { GETProjectFileResponse } from '@shared/types/Project.types'

function getPricingScheduleEndpoint() {
  return new URL('', 'https://lewiss-measure-pro.netlify.app/.netlify/functions/graph')
}

function getPricingScheduleFetchOptions(fileId: string) {
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

export async function GETPricingSchedule(
  blindType: Blind,
  endpoint: URL = getPricingScheduleEndpoint()
) {
  try {
    const fileId = blindTypeToPricingScheduleId[blindType]
    if (typeof fileId === 'undefined') throw new Error(`${blindType} is an invalid blind type`)

    const fetchOptions = getPricingScheduleFetchOptions(fileId)

    const response = await fetch(endpoint, fetchOptions)
    if (!response.ok) throw new Error(response.statusText)

    const json: GETProjectFileResponse = await response.json()
    const jsonContent: PricingSchedule = JSON.parse(json.content)
    return jsonContent
  } catch (error) {
    throw new Error(`fetch error pricing schedule ${blindType}`, { cause: error })
  }
}

const blindTypeToPricingScheduleId: Record<Blind, string> = {
  'Kinetics 10mm Cellular Blind': '01VFVMOAHWC4LUAIEQDJC3ZSVTJ2Y65NY7',
  'Kinetics 20mm Cellular Blind': '01VFVMOAHWC4LUAIEQDJC3ZSVTJ2Y65NY7',
  'Kinetics Sunscreen Roller Blind': '01VFVMOABN3IZBHUHWK5D3GJ7VFKUZAHJL',
  'Kinetics Blockout Roller Blind': '01VFVMOAGZEEB7JDTD7ZGZ5BJT2A4P6X7M',
  'Kinetics Light Filtering Roller Blind': '01VFVMOAGZEEB7JDTD7ZGZ5BJT2A4P6X7M',
  "Lewis's 25mm Aluminium Venetian": '01VFVMOABCLA7NPUXZ7BEIOOJUEIJJ55FP',
  "Lewis's 50mm Aluminium Venetian": '01VFVMOABCLA7NPUXZ7BEIOOJUEIJJ55FP',
  "Lewis's 50mm Fauxwood Venetian": '01VFVMOAAT7NEPTYHVTZBJWWJJDVAOM2ZV',
  "Lewis's 63mm Fauxwood Venetian": '01VFVMOAAT7NEPTYHVTZBJWWJJDVAOM2ZV',
  "Lewis's 50mm Phoenixwood Venetian": '01VFVMOAF5JFTC6G6RLJBJJDYUUO4LGUYC',
  "Lewis's 63mm Phoenixwood Venetian": '01VFVMOAF5JFTC6G6RLJBJJDYUUO4LGUYC',
  'Kinetics Mikronwood 50mm Venetian': '01VFVMOAFNY64TEUT7FZBK4DCWQFEO5FIF',
  'Santa Fe Woodlore Shutter': '01VFVMOABVHGDAQQW3ANG3P6UPTMQPH3O6',
  'Santa Fe Woodlore Plus Shutter': '01VFVMOABVHGDAQQW3ANG3P6UPTMQPH3O6',
  'Santa Fe Waterproof Woodlore Plus Shutter': '01VFVMOABVHGDAQQW3ANG3P6UPTMQPH3O6',
  'Santa Fe Normandy Shutter': '01VFVMOABVHGDAQQW3ANG3P6UPTMQPH3O6'
}
