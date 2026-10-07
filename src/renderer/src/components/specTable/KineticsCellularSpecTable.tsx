import { SpecTableFeatures } from '@/components/specTable/specTableUtility'
import { KineticsCellularTableEntry } from '@shared/types/tableEntry/kineticsCellular.types'
import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<SpecTableFeatures, KineticsCellularTableEntry>()

export const kineticsCellularTableColumns = columnHelper.columns([])
