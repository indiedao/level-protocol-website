import useMember from '../../hooks/useMember'
import useWeb3 from '../../hooks/useWeb3'

const MemberDetail = () => {
  const { address } = useWeb3()
  const { member } = useMember()

  if (!member) return <h2>Loading member...</h2>

  return (
    <div>
      <h2>Member Details</h2>
      <ul>
        <li>Address: {address}</li>
        <li>nftId: {member.nftId}</li>
        <li>nftAddress: {member.nftAddress}</li>
        <li>colorHue: {member.colorHue}</li>
        <li>colorLightness: {member.colorLightness}</li>
        <li>github: {member.github || 'NO GITHUB LINKED'}</li>
      </ul>
    </div>
  )
}

export default MemberDetail
