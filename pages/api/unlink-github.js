import withMethods from '../../util/api/withMethods'
import withAuth from '../../util/api/withAuth'
import { findMemberByAddress, updateMemberGithub } from '../../util/api/fauna'

const handler = async (req, res, { auth: { address } }) => {
  const member = await findMemberByAddress(address)
  await updateMemberGithub({ id: member._id, github: '' })
  res.statusCode = 200
  return res.json({ success: true })
}

export default withAuth(withMethods(['POST'], handler))
