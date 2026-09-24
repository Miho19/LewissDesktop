import { WindowDisplay } from '@shared/types/WindowDisplay.types'
import { createColumnHelper, tableFeatures } from '@tanstack/react-table'

export const windowTableFeatures = tableFeatures({})
export type WindowTableFeatures = typeof windowTableFeatures

const columnHelper = createColumnHelper<WindowTableFeatures, WindowDisplay>()
