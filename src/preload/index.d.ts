import { ElectronAPI } from '@electron-toolkit/preload'
import type { GETStaffResponse } from '@shared/types/Consultant.types'
import type { FolderItem } from '@shared/types/Folder.types'
import type { ProjectFile } from '@shared/types/Project.types'
import type { Blind } from '@shared/types/blind/blind.types'
import type {
  AccessorySchedule,
  PricingSchedule
} from '@shared/types/pricing/pricingSchedule.types'

export interface Api {
  getStaffList: () => Promise<GETStaffResponse>
  getFolder: (folderId: string) => Promise<FolderItem[]>
  getProjectFile: (fileId: string) => Promise<ProjectFile>
  getPricingSchedule: (blindType: Blind) => Promise<PricingSchedule>
  getAccessorySchedule: (blindType: Blind) => Promise<AccessorySchedule>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
