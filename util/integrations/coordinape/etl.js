import {
  getCommunityMembersHashes,
  updateCommunityMembersHash,
} from '../../community'
import { transform } from './transform'
import { load } from './load'

const etl = async (address, epochData) => {
  // Load existing community member data
  const { membersHash, membersDataHashes } = await getCommunityMembersHashes(
    address,
  )

  // Extract data
  // When an API exists for Coordinape, we can add an extract method

  // Transform member data
  const transformedData = await transform(epochData)

  // Load member data
  const updatedMembersDataHashes = await load(
    membersDataHashes,
    transformedData,
  )

  // Save updated community member data
  await updateCommunityMembersHash(
    address,
    membersHash,
    updatedMembersDataHashes,
  )
}

export default etl
