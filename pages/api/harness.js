import { Web3Storage } from 'web3.storage'
import { File } from 'web3.storage'
import { create } from 'ipfs-http-client'

function getAccessToken() {
  return process.env.WEB3STORAGE_TOKEN
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() })
}

function makeIpfsClient() {
  return create()
}

async function assignIpsn(cid) {
  const client = makeIpfsClient()
  const addr = `/ipfs/${cid}`
  const ipsn = await client.name.publish(addr)

  return ipsn
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
    // const ipsn = await assignIpsn(cid)
    res.statusCode = 200
    res.json({ cid })
  }
}
