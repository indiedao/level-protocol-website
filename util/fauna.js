import faunadb, { query as q } from 'faunadb'

export const graphQLClient = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
  domain: 'db.us.fauna.com',
})

export const createEcosystem = async ecosystem => {
  const { name, address, cid } = ecosystem
  graphQLClient
    .query(
      q.Create(q.Collection('ecosystems'), {
        data: { name, address, cid },
      }),
    )
    .then(ret => console.log(ret))
    .catch(err => console.error('Error: %s', err))
}
