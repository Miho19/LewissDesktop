import { Link, useParams } from '@tanstack/react-router'
import { FolderItem } from 'shared/types/Folder.types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

type Props = {
  folder: FolderItem[]
}

function FolderList(props: Props) {
  const { folder } = props
  const { consultantName } = useParams({ from: '/consultant/$consultantName/' })

  const projectFiles = filterProjectFile(folder)
  const sorted = sortProjectFileByLastModifiedDescending(projectFiles)
  const navigationLinkList = getNavigationLinks(sorted, consultantName)

  let description = ''
  if (navigationLinkList.length === 0) {
    description = 'No projects to process'
  } else {
    description = 'Select a project'
  }

  return (
    <Card className="w-full max-w-lg h-96 max-h-120">
      <CardHeader>
        <CardTitle>Project Files</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 p-0">
        <ScrollArea className="h-full w-full p-6">
          <ol className="flex flex-col space-y-4">{navigationLinkList}</ol>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

function filterProjectFile(folder: FolderItem[]) {
  const filtered = folder.filter(
    (f) =>
      f.isFile &&
      f.size !== 0 &&
      f.name.endsWith('.json') &&
      typeof getProjectName(f.name) !== 'undefined'
  )
  return filtered
}

function sortProjectFileByLastModifiedDescending(folder: FolderItem[]) {
  return folder.toSorted(
    (a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
  )
}

function getProjectName(
  file: string
): { customer: string; reference: string; createdAt: string } | undefined {
  const split = file.replace('.json', '').split('-')
  if (split.length !== 3) return undefined
  if (Number.isNaN(Number(split[1][0]))) return undefined

  return {
    customer: split[0],
    reference: split[1],
    createdAt: split[2]
  }
}

function getNavigationLinks(folder: FolderItem[], consultant: string) {
  return folder
    .map((f) => {
      const project = getProjectName(f.name)
      if (typeof project === 'undefined') return []
      const { customer, reference } = project

      return (
        <Link
          from="/consultant/$consultantName/"
          to="/consultant/$consultantName/project/$projectId"
          params={{ consultantName: consultant, projectId: f.id }}
          className="flex flex-col w-full items-center justify-between border-b pb-3 last:pb-6 transition-all hover:border-primary hover:pl-4 cursor-pointer"
          key={f.id}
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-md font-medium">{customer}</span>
            <span className="text-sm text-muted-foreground">{reference}</span>
          </div>
          <div className="text-xs text-muted-foreground flex w-full justify-end">
            {getFormattedLastModified(f.lastModified)}
          </div>
        </Link>
      )
    })
    .flat()
}

function getFormattedLastModified(dateString: string) {
  const date = new Date(dateString)

  return new Intl.DateTimeFormat('en-NZ', {
    timeZone: 'Pacific/Auckland',
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date)
}

export default FolderList
