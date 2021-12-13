import { query as q } from 'faunadb'
import { faunaClient } from '../../util/fauna'

export default async (req, res) => {
  if (req.method == 'GET') {
    let query = await faunaClient.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('ecosystems'))),
        q.Lambda(show => q.Get(show)),
      ),
    )
    res.status(200).json({ data: query.data })
  }
}
