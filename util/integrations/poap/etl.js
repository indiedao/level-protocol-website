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
  console.log({ community })
  // const { membersDataHashes } = community

  // // Extract data
  // const extractedData = await extract({
  //   addresses: ['0xf82793e75675b81b50c3101b2fdd584d946e09fd'],
  // })

  // // Transform data
  // const transformedData = transform(extractedData)

  // // Load member data
  // const updatedMembersDataHashes = await load(
  //   membersDataHashes,
  //   transformedData,
  // )

  // // Save updated community member data
  // await updateCommunityMembersHash(community, updatedMembersDataHashes)
}

export default etl
