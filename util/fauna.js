import faunadb, { query as q } from 'faunadb'

export const graphQLClient = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
  domain: 'db.us.fauna.com',
})

export const getEcosystems = async address => {
  const query = await graphQLClient.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection('ecosystems'))),
      q.Lambda(ecosystem => q.Get(ecosystem)),
    ),
  )

  return query.data
}

export const createEcosystem = async ecosystem => {
  const { name, address, cid } = ecosystem
  await graphQLClient.query(
    q.Create(q.Collection('ecosystems'), {
      data: { name, address, cid },
    }),
  )
}
