/* eslint-disable no-await-in-loop */
import withAuth from '../../util/api/withAuth'
import withMethods from '../../util/api/withMethods'
import { findCommunityByAddress } from '../../util/api/fauna'

// TODO: break out into a set of util functions:
const ROLLUP_FUNCTIONS = {
  snapshotVotePercentile: ({ allMembers, address }) => {
    // Percentile calculation on votes (rank out of 100%):
    // (number of values below score) / (total number of scores) x 100
    const memberScore = allMembers[address].snapshot.votes
    const allScores = Object.keys(allMembers).map(
      addr => allMembers[addr].snapshot.votes,
    )
    const below = allScores.filter(score => score < memberScore).length
    const total = allScores.length
    const percentile = Math.round((below / total) * 100)
    return percentile
  },
}

// TODO: abstract into step function / state machine lambda flow:
const handler = async (req, res, { auth: { address } }) => {
  // Get community details:
  const community = await findCommunityByAddress(address)
  const membersHashResp = await fetch(
    `https://indiedao.mypinata.cloud/ipfs/${community.membersHash}`,
  )
  const membersHash = await membersHashResp.json()
  const addresses = Object.keys(membersHash)

  // Get each member file for this community:
  const members = {}
  for (let i = 0; i < addresses.length; i += 1) {
    const resp = await fetch(
      `https://indiedao.mypinata.cloud/ipfs/${membersHash[addresses[i]]}`,
    )
    const json = await resp.json()
    members[addresses[i]] = json
  }

  // TODO: create and supply rollup config for each community, specifying which rollups to use for which skills
  // * Config should be a map of all skills this community owns
  // * Each skill key should contain an array of composable rollup functions to run (in order)
  const MockRollupConfig = {
    // skill: governance
    governance: 'snapshotVotePercentile',
  }

  // Execute rollup (each member > each skill > rollup):
  //
  // > each member
  Object.keys(members).forEach(memberAddress => {
    // > each skill
    Object.keys(MockRollupConfig).forEach(skill => {
      // > rollup
      const value = ROLLUP_FUNCTIONS[MockRollupConfig[skill]]({
        allMembers: members,
        address: memberAddress,
      })
      // eslint-disable-next-line no-console
      console.log(
        `member: [${memberAddress}] skill: [${skill}] rollup: [${MockRollupConfig[skill]}]: ${value}`,
      )
    })
  })

  res.statusCode = 200
  return res.json({ success: true })
}

export default withAuth(withMethods(['POST'], handler))
