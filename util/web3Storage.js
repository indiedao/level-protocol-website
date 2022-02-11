import { Web3Storage, File } from 'web3.storage'

export function getAccessToken() {
  return process.env.WEB3STORAGE_TOKEN
}

export function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() })
}

export function makeFileObjects(data) {
  const buffer = Buffer.from(JSON.stringify(data))

  const files = [new File([buffer], 'level.json')]
  return files
}

// export async function retrieveFilesData(cid) {
//   const client = makeStorageClient()
//   const res = await client.get(cid)
//   console.log(`Got a response! [${res.status}] ${res.statusText}`)
//   if (!res.ok) {
//     throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`)
//   }

//   const files = await res.files()
//   const lvlFile = files[0]

//   console.log('lvlFile', lvlFile)
// }

export async function storeFiles(files) {
  const client = makeStorageClient()
  const cid = await client.put(files)
  return cid
}
