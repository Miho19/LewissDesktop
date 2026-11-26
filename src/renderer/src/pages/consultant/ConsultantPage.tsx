import { useParams, useRouterState } from '@tanstack/react-router'
import useFolder from '@/hook/useFolder'
import { Spinner } from '@/components/ui/spinner'
import ConsultantAvatar from '@/components/applicationInformation/ConsultantAvatar'
import { toast } from 'sonner'
import { FolderItem } from '@shared/types/Folder.types'
import { useMemo } from 'react'
import ConsultantFileList from '@/components/fileList/ConsultantFileList'

function ConsultantPage() {
  const { consultantName } = useParams({ from: '/consultant/$consultantName/' })
  const { consultantFolder } = useRouterState({ select: (s) => s.location.state })
  const folderId = consultantFolder?.folderId ?? '' // not sure why but when navigating away from this page, this becomes undefined

  const { data, isPending, isLoading, isError, error } = useFolder(folderId)

  const jsonFileOnlyList: FolderItem[] = useMemo(() => {
    if (!data) return []
    return data.filter((d) => d.isFile && d.name.endsWith('.json'))
  }, [data])

  if (isPending || isLoading) return <RootFolderLoading />
  if (isError) {
    toast.error(error.message)
    return <div className="w-full"></div>
  }

  return (
    <div className="w-full h-full flex flex-col p-6 gap-8 items-center">
      <div className="flex w-full  focus:outline-none gap-4 items-center">
        <ConsultantAvatar name={consultantName} />
      </div>

      <ConsultantFileList fileList={jsonFileOnlyList} />
    </div>
  )
}

export default ConsultantPage

function RootFolderLoading() {
  return (
    <div className="w-full h-full items-center justify-center flex flex-col p-6 gap-2">
      <Spinner />
    </div>
  )
}
