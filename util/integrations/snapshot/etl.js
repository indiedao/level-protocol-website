import {
  getCommunityWithMembersHashes,
  updateCommunityMembersHash,
} from '../../api/community'
import { extract } from './extract'
import { transform } from './transform'
import { load } from './load'

const etl = async address => {
  // Load existing community member data
  const community = await getCommunityWithMembersHashes(address)
  const { membersDataHashes, snapshotEns } = community

  if (!community.snapshotEns) {
    throw new Error('Missing configuration: snapshotEns!')
  }

  // Extract data
  const extractedData = await extract({
    ens: snapshotEns,
  })

  // Transform data
  const transformedData = transform(extractedData)

  // Load member data
  const updatedMembersDataHashes = await load(
    membersDataHashes,
    transformedData,
  )

  // Save updated community member data
  await updateCommunityMembersHash(community, updatedMembersDataHashes)
}

export default etl
