import { query as q } from 'faunadb'

const SortMemebersByCreatedAtDesc = {
  name: 'sort_members_by_created_at_desc',
  body: q.Query(
    q.Lambda(
      ['size', 'after', 'before'],
      q.Let(
        {
          match: q.Reverse(
            q.Match(q.Index('all_members_sorted_by_created_at')),
          ),
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

export default SortMemebersByCreatedAtDesc
