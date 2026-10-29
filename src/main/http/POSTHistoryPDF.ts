function POSTSharePointOrderPDFFetchOptions(
  fileName: string,
  content: string,
  folderId: string
): RequestInit {
  const fetchOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'uploadPDF',
      folderId: folderId,
      filename: fileName,
      fileBase64: content
    })
  }

  return fetchOptions
}

// root/confirmed orders/
// 01VFVMOAEPH2B72PIHJNBYWJDJZL2ZZQIW
