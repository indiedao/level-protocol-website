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

  const files = [new File([buffer], `test.json`)]

  return files
}

async function storeFiles(files) {
  const client = makeStorageClient()
  const cid = await client.put('test')
  return cid
}

export default (req, res) => {
  if (req.method === 'POST') {
    console.log(req.body)
    const { data, cid } = req.body
    const files = makeFileObjects(cid, data)
    console.log('files', files)
    const newCid = storeFiles(files)
    res.statusCode = 200
    res.json({ newCid })
  }
}
