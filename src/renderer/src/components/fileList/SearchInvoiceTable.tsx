import FileListTable from '@/components/fileList/FileListTable'
import { FileListTableFeatures, FileTableColumn } from '@/components/fileList/FileListTableUtility'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'

import useFolder from '@/hook/useFolder'
import { FolderItem } from '@shared/types/Folder.types'
import { useNavigate } from '@tanstack/react-router'
import { useTable } from '@tanstack/react-table'
import { useMemo } from 'react'

import { toast } from 'sonner'

const pricingScheduleFolderId = '01VFVMOAGDZWNVJR6FLFDJXTBKZNOWGLNC'

function SearchInvoiceTable() {
  const { data, isPending, isLoading, isError, error } = useFolder(pricingScheduleFolderId)
  const navigate = useNavigate()

  const invoiceOnlyList: FolderItem[] = useMemo(() => {
    if (!data) return []
    return data.filter((d) => d.isFile && d.name.endsWith('.json'))
  }, [data])

  const table = useTable({
    features: FileListTableFeatures,
    columns: FileTableColumn,
    data: invoiceOnlyList,
    initialState: {
      sorting: [{ id: 'lastModified', desc: true }]
    }
  })

  if (isPending || isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (isError) {
    toast.error(error.message)
    return <div className="w-full"></div>
  }

  function rowOnClickHandler(fileId: string) {
    navigate({ from: '/process/$fileId', params: { fileId: fileId } })
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <FieldSet>
        <FieldLegend>Pricing Schedule</FieldLegend>
        <FieldDescription>Select to process</FieldDescription>
        <FieldGroup>
          <div className="flex flex-col md:grid grid-cols-3 gap-4">
            <Field>
              <FieldLabel htmlFor="customerName">Customer Name</FieldLabel>
              <Input
                placeholder="Filter customer name"
                value={(table.getColumn('customerName')?.getFilterValue() as string) ?? ''}
                onChange={(event) =>
                  table.getColumn('customerName')?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
                id="customerName"
                name="customerName"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="customerNumber">Customer Number</FieldLabel>
              <Input
                placeholder="Filter customer number"
                value={(table.getColumn('customerNumber')?.getFilterValue() as string) ?? ''}
                onChange={(event) =>
                  table.getColumn('customerNumber')?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
                id="customerNumber"
                name="customerNumber"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="invoiceNumber">Invoice Number</FieldLabel>
              <Input
                placeholder="Filter invoice number"
                value={(table.getColumn('invoiceNumber')?.getFilterValue() as string) ?? ''}
                onChange={(event) =>
                  table.getColumn('invoiceNumber')?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
                id="invoiceNumber"
                name="invoiceNumber"
              />
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>

      <FileListTable table={table} rowOnClick={rowOnClickHandler} />
    </div>
  )
}

export default SearchInvoiceTable
