import { Web3Storage } from 'web3.storage'
import { File } from 'web3.storage'

function getAccessToken() {
  return process.env.WEB3STORAGE_TOKEN
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() })
}

function makeFileObjects(data) {
  const buffer = Buffer.from(JSON.stringify(data))

  const files = [
    new File(['level'], 'plain-utf8.txt'),
    new File([buffer], 'level.json'),
  ]
  return files
}

async function storeFiles(files) {
  const client = makeStorageClient()
  const cid = await client.put(files)
  return cid
}

export default async (req, res) => {
  if (req.method === 'POST') {
    const files = makeFileObjects(req.body)
    const cid = await storeFiles(files)
    res.statusCode = 200
    res.json({ cid })
  }
}
