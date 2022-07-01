import { query as q } from 'faunadb'

const CommunitiesCounterIndex = {
  name: 'communities_counter',
  source: q.Collection('CommunitiesCounter'),
  serialized: true,
  terms: [
    {
      field: ['data', 'counter'],
    },
  ],
}

export default CommunitiesCounterIndex
