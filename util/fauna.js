import faunadb, { query } from 'faunadb'

export const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
})

export const getCommunities = async name => {
  const q = query.Paginate(query.Match(query.Ref('indexes/allCommunities')))
  const response = await client.query(q)
  const refs = response.data
  const communitiesQuery = refs.map(ref => query.Get(ref))
  const communities = await client.query(communitiesQuery)

  return communities
}
