export function getAccessToken() {
  return process.env.WEB3STORAGE_TOKEN
}

export function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() })
}

export function makeFileObjects(data) {
  const buffer = Buffer.from(JSON.stringify(data))

  const files = [
    new File(['level'], 'plain-utf8.txt'),
    new File([buffer], 'level.json'),
  ]
  return files
}

export async function storeFiles(files) {
  const client = makeStorageClient()
  const cid = await client.put(files)
  return cid
}
