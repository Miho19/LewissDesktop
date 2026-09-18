import { ElectronAPI } from '@electron-toolkit/preload'
import type { GETStaffResponse } from '@shared/types/Consultant.types'
import type { FolderItem } from '@shared/types/Folder.types'
import type { ProjectFile } from '@shared/types/Project.types'
import type { Blind } from '@shared/types/blind/blind.types'
import { PDFResponse } from '@shared/types/pdf.types'
import type {
  AccessorySchedule,
  PricingSchedule
} from '@shared/types/pricing/pricingSchedule.types'
import { Worksheet } from '@shared/types/worksheet/Worksheet.types'

export interface Api {
  getStaffList: () => Promise<GETStaffResponse>
  getFolder: (folderId: string) => Promise<FolderItem[]>
  getProjectFile: (fileId: string) => Promise<ProjectFile>
  getPricingSchedule: (blindType: Blind) => Promise<PricingSchedule>
  getAccessorySchedule: (blindType: Blind) => Promise<AccessorySchedule>
  createWorksheetPDF: (worksheet: Worksheet) => Promise<PDFResponse>
  openPDF: (pdfBase64: string) => Promise<void>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
