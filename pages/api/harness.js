import { create } from 'ipfs-http-client'
import { makeFileObjects, storeFiles } from '../../util/web3Storage'

function makeIpfsClient() {
  return create()
}

async function assignIpsn(cid) {
  const client = makeIpfsClient()
  const addr = `/ipfs/${cid}`
  const ipsn = await client.name.publish(addr)

  return ipsn
}

export default async (req, res) => {
  if (req.method === 'POST') {
    const files = makeFileObjects(req.body)
    const cid = await storeFiles(files)
    // const ipsn = await assignIpsn(cid)
    res.statusCode = 200
    console.log('cid', cid)
    res.json({ cid })
  }
}
