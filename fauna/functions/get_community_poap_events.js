import { query as q } from 'faunadb'
import PaginatedQuery from '../lib/PaginatedQuery'

const GetCommunityPoapEvents = {
  name: 'get_community_poap_events',
  body: PaginatedQuery(
    ['communityId'],
    q.Match(
      q.Index('community_poap_events_by_community'),
      q.Ref(q.Collection('Community'), q.Var('communityId')),
    ),
  ),
}

export default GetCommunityPoapEvents
