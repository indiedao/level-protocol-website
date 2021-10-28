import { Web3Storage } from 'web3.storage'
import { File } from 'web3.storage'

function getAccessToken() {
  return process.env.WEB3STORAGE_TOKEN
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() })
}

function makeFileObjects(cid, data) {

  const buffer = Buffer.from(JSON.stringify(data))

  console.log('buffer', buffer)

  const files = [new File([buffer], `${cid}.json`)]
  return files
}

async function storeFiles(files) {
  const client = makeStorageClient()
  const cid = await client.put(files)
  return cid
}

export default (req, res) => {
  if (req.method === 'POST') {
    const { data, cid } = req.body
    const files = makeFileObjects(cid, data)
    const newCid = storeFiles(files)
    res.statusCode = 200
    res.json({ newCid })
  }
}
