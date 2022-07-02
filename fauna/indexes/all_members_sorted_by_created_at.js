import { query as q } from 'faunadb'

const AllMembersSortedByCreatedAt = {
  name: 'all_members_sorted_by_created_at',
  source: q.Collection('Member'),
  values: [{ field: ['data', 'createdAt'] }, { field: ['ref'] }],
}

export default AllMembersSortedByCreatedAt
