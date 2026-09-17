import { createWindowWareHeader } from '@main/pdf/shared'
import { Worksheet } from '@shared/types/worksheet/Worksheet.types'

export async function getKineticsCellularPDFContentAsync(worksheet: Worksheet) {
  const windowWareHeader = await createWindowWareHeader()
  return []
}
