import { ElectronAPI } from '@electron-toolkit/preload'
import type { GETStaffResponse } from '@shared/types/Consultant.types'
import type { FolderItem, POSTFileResponse } from '@shared/types/Folder.types'
import type { ProjectFile } from '@shared/types/Project.types'
import type { Blind } from '@shared/types/blind/blind.types'
import { PDFResponse } from '@shared/types/pdf.types'
import type {
  AccessorySchedule,
  PricingSchedule
} from '@shared/types/pricing/pricingSchedule.types'
import { Worksheet } from '@shared/types/worksheet/Worksheet.types'
import type { ApplicationInformation } from '@shared/types/Application.types'

export interface Api {
  getStaffList: () => Promise<GETStaffResponse>
  getFolder: (folderId: string) => Promise<FolderItem[]>
  getProjectFile: (fileId: string) => Promise<ProjectFile>
  getPricingSchedule: (blindType: Blind) => Promise<PricingSchedule>
  getAccessorySchedule: (blindType: Blind) => Promise<AccessorySchedule>
  createWorksheetPDF: (worksheet: Worksheet) => Promise<PDFResponse>
  openPDF: (fileName: string, pdfBase64: string) => Promise<void>
  getApplicationInformation: () => Promise<ApplicationInformation>
  writeWorksheetToSharePoint: (worksheet: Worksheet, file: ProjectFile) => Promise<POSTFileResponse>
  writeWorksheetPDFToSharePoint: (
    worksheet: Worksheet,
    pdfBase64: string
  ) => Promise<POSTFileResponse>
  writeWorksheetPDFToOrder: (worksheet: Worksheet, pdfBase64: string) => Promise<POSTFileResponse>
  writeWorksheetPDFToPending: (worksheet: Worksheet, pdfBase64: string) => Promise<POSTFileResponse>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
