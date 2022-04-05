import withMethods from '../../util/api/withMethods'
import {
  communitiesCount,
  getAccessList,
  getAllCommunities,
  membersCount,
  updateCommunitiesCounter,
  updateMembersCounter,
} from '../../util/fauna'

const ALL = 1000000

const handler = async (req, res) => {
  if (!process.env.NEXT_PUBLIC_ENABLE_DATA_MIGRATIONS) {
    res.statusCode = 401
    return res.json({ success: false, error: 'Not Authorized' })
  }

  try {
    const allMembers = await getAccessList(ALL)
    const allCommunities = await getAllCommunities(ALL)

    const membersCounter = await membersCount()
    const communitiesCounter = await communitiesCount()
    const updatedMembersCounter = await updateMembersCounter(
      membersCounter._id,
      allMembers.length,
    )
    const updatedCommunitiesCounter = await updateCommunitiesCounter(
      communitiesCounter._id,
      allCommunities.length,
    )

    res.statusCode = 201
    return res.json({
      success: true,
      data: {
        previousMembersCount: membersCounter.counter,
        previousCommunitiesCount: communitiesCounter.counter,
        membersCount: updatedMembersCounter.counter,
        communitiesCount: updatedCommunitiesCounter.counter,
      },
    })
  } catch (error) {
    res.statusCode = 500
    return res.json({ success: false, error: error.message })
  }
}

export default withMethods(['GET'], handler)
