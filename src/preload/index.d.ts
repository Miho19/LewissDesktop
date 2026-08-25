import { ElectronAPI } from '@electron-toolkit/preload'
import type { GETStaffResponse } from '../shared/types/Consultant.types'
import type { FolderItem } from '../shared/types/Folder.types'
import type { ProjectFile } from '../shared/types/Project.types'

export interface Api {
  getStaffList: () => Promise<GETStaffResponse>
  getFolder: (folderId: string) => Promise<FolderItem[]>
  getProjectFile: (fileId: string) => Promise<ProjectFile>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
