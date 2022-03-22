import pinata from '../../pinata'
import { findCommunityByAddress, updateCommunityDataHash } from '../../fauna'
import { extract } from './extract'
import { transform } from './transform'
import { load } from './load'

const etl = async address => {
  const community = await findCommunityByAddress(address)

  if (!community.snapshotEns)
    throw new Error('Missing configuration: snapshotEns!')

  // Extract data:
  const extractedData = await extract({
    ens: community.snapshotEns,
  })

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
