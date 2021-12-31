import faunadb, { query } from 'faunadb'

export const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
})

export const getCommunities = async () => {
  const q = query.Paginate(query.Match(query.Ref('indexes/allCommunities')))
  const response = await client.query(q)
  const refs = response.data
  const communitiesQuery = refs.map(ref => query.Get(ref))
  const communities = await client.query(communitiesQuery)

  return communities
}

export const updateCommunity = async (ref, data) => {
  const result = await client.query(
    query.Update(query.Ref(query.Collection('communities'), ref.id), {
      data,
    }),
  )

  return result
}
