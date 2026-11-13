export function getLastModifiedFormatted(dateString: string) {
  const date = new Date(dateString)

  return new Intl.DateTimeFormat('en-NZ', {
    timeZone: 'Pacific/Auckland',
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date)
}
