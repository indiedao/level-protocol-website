import { query as q } from 'faunadb'

export default {
  name: 'all_members_sorted_by_created_at',
  source: q.Collection('Member'),
  values: [{ field: ['data', 'createdAt'] }, { field: ['ref'] }],
}
