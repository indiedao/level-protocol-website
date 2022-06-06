import {
  getCommunityWithMembersHashes,
  updateCommunityMembersHash,
} from '../../api/community'
import { extract } from './extract'
import { transform } from './transform'
import { load } from './load'

/**
 * Create your ETL (Extract/Transform/Load) package:
 *
 * 1. etl.js - can be called by an API trigger (from admin) or webhook (from integration source)
 * 2. extract.js - fetches raw data from the integration source
 * 3. transform.js - transforms the data into a member-centric format
 * 4. load.js - loads the member-centric data into per-member files on IPFS
 *
 * ETL finishes by adding/updating a membersHash to the community config, which points to each member's IPFS data hash
 */
const etl = async address => {
  // Load existing community member data
  const community = await getCommunityWithMembersHashes(address)
  const { membersDataHashes } = community

  // Extract data
  const extractedData = await extract()

  // Transform data
  const transformedData = await transform(extractedData)

  // Load member data
  const updatedMembersDataHashes = await load(
    membersDataHashes,
    transformedData,
  )

  // Save updated community member data
  await updateCommunityMembersHash(community, updatedMembersDataHashes)
}

export default etl
