import { makeFileObjects, storeFiles } from '../../util/web3Storage'
import { mapCoordinapeData } from '../../util/coordinape'

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      console.log('req.body', req.body)
      const coordinapeData = mapCoordinapeData(req.body.coordinape)
      const files = makeFileObjects(coordinapeData)
      const cid = await storeFiles(files)

      res.statusCode = 200
      console.log('cid', cid)
      res.json({ cid })
    }
  } catch (e) {
    res.status(422).send(e)
  }
}
