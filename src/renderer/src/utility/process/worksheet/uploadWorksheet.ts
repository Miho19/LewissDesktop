import { ProjectFile } from '@shared/types/Project.types'
import { Worksheet } from '@shared/types/worksheet/Worksheet.types'

export async function uploadWorksheet(worksheet: Worksheet, file: ProjectFile) {
  const response = await window.api.writeWorksheetToSharePoint(worksheet, file)
  return response
}
