import { makeFileObjects, storeFiles } from '../../util/web3Storage'
import { mapCoordinapeData } from '../../util/coordinape'

const CoordinapeAPI = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const coordinapeData = mapCoordinapeData(req.body.coordinape)
      const files = makeFileObjects(coordinapeData)
      const cid = await storeFiles(files)

      res.statusCode = 200
      res.json({ cid })
    }
  } catch (e) {
    res.status(422).send(e)
  }
}

export default CoordinapeAPI
