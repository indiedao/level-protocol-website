import Button from '../../ui/Button'
import { githubClientId } from '../../../util/constants'
import useMember from '../../hooks/useMember'
import useWeb3 from '../../hooks/useWeb3'

const LinkGithubForm = () => {
  const { bearerToken } = useWeb3()
  const { member, loadMember } = useMember()

  const linkGithub = async () => {
    window.location = `https://github.com/login/oauth/authorize?client_id=${githubClientId}`
  }

  const unlinkGithub = async () => {
    await fetch('/api/unlink-github', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${bearerToken}`,
      },
    })
    await loadMember()
  }

  if (!member) return <h2>Loading member...</h2>

  return (
    <div>
      <h2>Member Details</h2>
      <Button onClick={member.github ? unlinkGithub : linkGithub}>
        {member.github ? 'Unlink' : 'Link'} Github
      </Button>
    </div>
  )
}

export default LinkGithubForm
