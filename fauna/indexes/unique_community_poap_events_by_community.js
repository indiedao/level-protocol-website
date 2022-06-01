import { query as q } from 'faunadb'

const UniqueCommunityPoapEventsByCommunity = {
  name: 'unique_community_poap_events_by_community',
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

export default UniqueCommunityPoapEventsByCommunity
