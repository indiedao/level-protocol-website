import { getCommunityPoapEvents } from '../../api/fauna'
import { getTokensWithEventIds } from '../../api/poapSubgraph'

export const extract = async ({ communityId }) => {
  // Get poap events for the community
  const events = await getCommunityPoapEvents({ communityId })
  const eventIds = events.map(event => event.eventId.toString())

  // Get tokens for the events
  const tokens = await getTokensWithEventIds(eventIds)
  return tokens
}
