import { query as q } from 'faunadb'

const MembersCounterIndex = {
  name: 'members_counter',
  source: q.Collection('MembersCounter'),
  serialized: true,
  terms: [
    {
      field: ['data', 'counter'],
    },
  ],
}

export default MembersCounterIndex
