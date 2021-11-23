import { makeFileObjects, storeFiles } from '../../util/web3Storage'
import { createEcosystem } from '../../util/fauna'

export default async (req, res) => {
  if (req.method === 'POST') {
    const files = makeFileObjects(req.body)
    const cid = await storeFiles(files)
    await createEcosystem({
      name: 'IndieDAO',
      address: 'Ox',
      cid,
    })
    res.statusCode = 200
    console.log('cid', cid)
    res.json({ cid })
  }
}
