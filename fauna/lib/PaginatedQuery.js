import { query as q } from 'faunadb'

export default function PaginatedQuery(args = [], match) {
  return q.Query(
    q.Lambda(
      [...args, 'size', 'after', 'before'],
      q.Let(
        {
          match,
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
        q.Map(q.Var('page'), q.Lambda('value', q.Get(q.Var('value')))),
      ),
    ),
  )
}
