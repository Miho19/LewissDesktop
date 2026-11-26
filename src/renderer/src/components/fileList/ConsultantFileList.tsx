import { useNavigate, useParams } from '@tanstack/react-router'
import { FolderItem } from '@shared/types/Folder.types'

type Props = {
  fileList: FolderItem[]
}

function ConsultantFileList(props: Props) {
  const { fileList } = props
  const { consultantName } = useParams({ from: '/consultant/$consultantName/' })
  const navigate = useNavigate()

  function onRowClickHandler(fileId: string) {
    navigate({
      from: '/consultant/$consultantName/project/$projectId',
      params: { consultantName: consultantName, projectId: fileId }
    })
  }

  return <></>
}

export default ConsultantFileList
