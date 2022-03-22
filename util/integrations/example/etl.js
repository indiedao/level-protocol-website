import pinata from '../../pinata'
import { findCommunityByAddress, updateCommunityDataHash } from '../../fauna'
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
 * ETL finishes by adding a membersHash to the community config, which points to each member's IPFS data hash
 */
const etl = async address => {
  // Get Community:
  const community = await findCommunityByAddress(address)

  // Extract data:
  const extractedData = await extract()

  // Transform data:
  const transformedData = await transform(extractedData)

  // Load data:
  const updatedMembers = await load(transformedData)

  // Update Community membersHash:
  // eslint-disable-next-line import/no-named-as-default-member
  const { IpfsHash } = await pinata.pinJSONToIPFS(updatedMembers)
  await updateCommunityDataHash({
    id: community._id,
    membersHash: IpfsHash,
  })
}

export default etl
