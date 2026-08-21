type Props = {
  error?: Error
}
function ErrorPage(props: Props) {
  const { error } = props

  return (
    <div>
      <p>Error has occured</p>
      <p>{error?.message}</p>
    </div>
  )
}

export default ErrorPage
