import { useNavigate, useParams } from '@tanstack/react-router'
import { FolderItem } from '@shared/types/Folder.types'
import {
  FileListTableFeatures,
  ConsultantFileListTableColumn
} from '@/components/fileList/FileListTableUtility'
import { useTable } from '@tanstack/react-table'
import FileListTable from '@/components/fileList/FileListTable'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

type Props = {
  fileList: FolderItem[]
  consultantName: string
}

function ConsultantFileList(props: Props) {
  const { fileList, consultantName } = props
  const navigate = useNavigate()

  const table = useTable({
    features: FileListTableFeatures,
    columns: ConsultantFileListTableColumn,
    data: fileList,
    initialState: {
      sorting: [{ id: 'lastModified', desc: true }]
    }
  })

  function onRowClickHandler(fileId: string) {
    navigate({
      from: '/consultant/$consultantName/project/$projectId',
      params: { consultantName: consultantName, projectId: fileId }
    })
  }

  return (
    <div className="flex flex-col w-full gap-8">
      <FieldSet>
        <FieldLegend>{consultantName}</FieldLegend>
        <FieldDescription>Select a project</FieldDescription>
        <FieldGroup>
          <div className="flex flex-col md:grid grid-cols-2 gap-4">
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
          </div>
        </FieldGroup>
      </FieldSet>
      <FileListTable table={table} rowOnClick={onRowClickHandler} />
    </div>
  )
}

export default ConsultantFileList
