import { query as q } from 'faunadb'

const DecrementCommunitiesCounter = {
  name: 'decrement_communities_counter',
  body: q.Query(
    q.Lambda(
      [],
      q.Let(
        {
          counterRef: q.Ref(q.Collection('CommunitiesCounter'), '1'),
          counter: q.Get(q.Var('counterRef')),
          counterValue: q.Select(['data', 'counter'], q.Var('counter')),
        },
        q.Update(q.Var('counterRef'), {
          data: {
            counter: q.Add(q.Var('counterValue'), -1),
          },
        }),
      ),
    ),
  ),
}

export default DecrementCommunitiesCounter
