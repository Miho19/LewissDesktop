import { ElectronAPI } from '@electron-toolkit/preload'
import type { GETStaffResponse } from '../shared/types/Consultant.types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getStaffList: () => Promise<GETStaffResponse>
    }
  }
}
