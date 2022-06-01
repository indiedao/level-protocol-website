import { format, parse } from 'date-fns'
import withMethods from '../../util/api/withMethods'
import withAuth from '../../util/api/withAuth'
import withValidParams from '../../util/api/withValidParams'
import { createCommunityPoapEvent } from '../../util/api/fauna'
import { getPoapEvent } from '../../util/api/poap'

const handler = async (req, res, { auth: { address } }) => {
  const { communityId, eventIds } = req.body

  // Get POAP event data
  await Promise.all(
    eventIds.map(async eventId => {
      const event = await getPoapEvent(eventId)
      await createCommunityPoapEvent({
        communityId,
        eventId: event.id,
        fancyId: event.fancy_id,
        name: event.name,
        imageUrl: event.image_url,
        description: event.description,
        startDate: _toFaunaDate(event.start_date),
        endDate: _toFaunaDate(event.end_date),
        url: event.event_url,
      })
    }),
  )
  // Create Community POAP Events

  res.statusCode = 200
  return res.json({ success: true })
}

function _toFaunaDate(dateStr) {
  return format(parse(dateStr, 'dd-MMM-yyyy', new Date()), 'yyyy-MM-dd')
}

export default withValidParams(
  {
    communityId: {
      presence: true,
    },
    eventIds: {
      presence: true,
    },
  },
  withAuth(withMethods(['POST'], handler)),
)
