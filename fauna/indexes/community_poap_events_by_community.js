import { query as q } from 'faunadb'

const CommunityPoapEventsByCommunity = {
  name: 'community_poap_events_by_community',
  source: q.Collection('CommunityPoapEvent'),
  serialized: true,
  terms: [
    {
      field: ['data', 'community'],
    },
  ],
}

export default CommunityPoapEventsByCommunity
