import { retrieveFilesData } from '../../../util/web3Storage'

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { cid } = req.query
      // const res = await fetch(`https://ipfs.io/ipfs/${cid}/level.json`) // compiled data
      const data = await retrieveFilesData(cid)

      // TODO:
      // - get the data from the ipfs
      // - parse the data
      // - rollup the data into skills
      // - store the data in the ipfs

      res.statusCode = 200
      res.json({ data })
    } catch (error) {
      console.error(error)
      res.statusCode = 500
      res.json({ error })
    }
  }
}
