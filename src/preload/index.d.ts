import { ElectronAPI } from '@electron-toolkit/preload'
import type { GETStaffResponse } from '../shared/types/Consultant.types'
import type { FolderItem } from '../shared/types/Folder.types'

export interface Api {
  getStaffList: () => Promise<GETStaffResponse>
  getFolder: (folderId: string) => Promise<FolderItem[]>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
