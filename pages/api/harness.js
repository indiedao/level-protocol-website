import { Web3Storage, File } from 'web3.storage'

const getAccessToken = () => {
  return process.env.WEB3STORAGE_TOKEN
}

const makeStorageClient = () => {
  return new Web3Storage({ token: getAccessToken() })
}

const makeFileObjects = (cid, data) => {
  const buffer = Buffer.from(JSON.stringify(data))

  const files = [new File([buffer], 'test.json')]

  return files
}

const storeFiles = async files => {
  console.log(files) // eslint-disable-line no-console
  const client = makeStorageClient()
  const cid = await client.put('test')
  return cid
}

const handler = (req, res) => {
  if (req.method === 'POST') {
    console.log(req.body) // eslint-disable-line no-console
    const { data, cid } = req.body
    const files = makeFileObjects(cid, data)
    console.log('files', files) // eslint-disable-line no-console
    const newCid = storeFiles(files)
    res.statusCode = 200
    res.json({ newCid })
  }
}

export default handler
