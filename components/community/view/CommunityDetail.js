import useCommunity from '../../hooks/useCommunity'

const CommunityDetail = () => {
  const { community, members } = useCommunity()

  if (!community) return <h2>Loading community...</h2>

  return (
    <div>
      <h2>Community Details</h2>
      <ul>
        <li>Name: {community.name}</li>
        <li>Address: {community.address}</li>
        <li>Members Hash: {community.membersHash}</li>
      </ul>
      <h2>Members</h2>
      <ul>
        {Object.keys(members).map(address => (
          <li key={address}>
            <a
              href={`https://indiedao.mypinata.cloud/ipfs/${members[address]}`}
              target="_blank"
              rel="noreferrer"
            >
              {address}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CommunityDetail
