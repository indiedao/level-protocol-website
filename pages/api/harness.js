import { makeFileObjects, storeFiles } from '../../util/web3Storage'
import { getCommunities } from '../../util/fauna'

export default async (req, res) => {
  if (req.method === 'POST') {
    // const files = makeFileObjects(req.body)
    // const cid = await storeFiles(files)
    const communities = await getCommunities()
    res.statusCode = 200
    console.log('communities', communities)
    res.json({ communities })
  }
}
