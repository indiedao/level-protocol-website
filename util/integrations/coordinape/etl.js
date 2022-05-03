import {
  getCommunityWithMembersHashes,
  updateCommunityMembersHash,
} from '../../api/community'
import { transform } from './transform'
import { load } from './load'

const etl = async (address, epochData) => {
  // Load existing community member data
  const community = await getCommunityWithMembersHashes(address)
  const { membersDataHashes } = community

  // Extract data
  // When an API exists for Coordinape, we can add an extract method

  // Transform data
  const transformedData = await transform(epochData)

  // Load member data
  const updatedMembersDataHashes = await load(
    membersDataHashes,
    transformedData,
  )

  // Save updated community member data
  await updateCommunityMembersHash(community, updatedMembersDataHashes)
}

export default etl
