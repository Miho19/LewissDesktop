import { ElectronAPI } from '@electron-toolkit/preload'
import type { GETStaffResponse } from '../shared/types/Consultant.types'

export interface Api {
  getStaffList: () => Promise<GETStaffResponse>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
