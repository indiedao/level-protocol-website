import { query as q } from 'faunadb'

const CommunityPoapEventsByCommunity = {
  name: 'community_poap_events_by_community',
  source: q.Collection('CommunityPoapEvent'),
  unique: true,
  serialized: true,
  terms: [
    {
      field: ['data', 'community'],
    },
    {
      field: ['data', 'eventId'],
    },
  ],
}

export default CommunityPoapEventsByCommunity
