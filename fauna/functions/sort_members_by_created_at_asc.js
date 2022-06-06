import { query as q } from 'faunadb'

const SortMembersByCreatedAtAsc = {
  name: 'sort_members_by_created_at_asc',
  body: q.Query(
    q.Lambda(
      ['size', 'after', 'before'],
      q.Let(
        {
          match: q.Match(q.Index('all_members_sorted_by_created_at')),
          page: q.If(
            q.Equals(q.Var('before'), null),
            q.If(
              q.Equals(q.Var('after'), null),
              q.Paginate(q.Var('match'), { size: q.Var('size') }),
              q.Paginate(q.Var('match'), {
                size: q.Var('size'),
                after: q.Var('after'),
              }),
            ),
            q.Paginate(q.Var('match'), {
              size: q.Var('size'),
              before: q.Var('before'),
            }),
          ),
        },
        q.Map(
          q.Var('page'),
          q.Lambda('values', q.Get(q.Select(1, q.Var('values')))),
        ),
      ),
    ),
  ),
}

export default SortMembersByCreatedAtAsc
