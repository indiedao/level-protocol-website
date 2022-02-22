import { useState } from 'react'
import styled from 'styled-components'
import { H4, H3 } from '../ui/Typography'
import Button from '../ui/Button'
import useCommunity from '../hooks/useCommunity'
import useWeb3 from '../hooks/useWeb3'

const Wrapper = styled.div`
  margin: 3.6rem 0;
`

const IpfsLink = styled.div`
  a {
    color: ${props => props.theme.colors.white};
  }
`

const Spinner = styled.div`
  border: 0.4rem solid ${props => props.theme.colors.white};
  border-radius: 50%;
  border-left-color: transparent;
  width: 3.6rem;
  height: 3.5rem;
  animation: spin 1s linear infinite;

  & > * {
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  }
`

const SourcecredView = () => {
  const [membersData, setMembersData] = useState(null)
  const [loading, setLoading] = useState(false)
  const { isAdmin, currentCommunity } = useCommunity()
  const { disconnect } = useWeb3()

  const handleSubmit = async () => {
    try {
      setLoading(true)
      setMembersData(null)
      const res = await fetch('/api/webhooks/sourcecred', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: true,
      })

      const { updatedData } = await res.json()
      setMembersData(updatedData)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const ipfsUrl =
    membersData && membersData.cid
      ? `https://ipfs.io/ipfs/${membersData.cid}/level.json`
      : null

  return (
    <Wrapper>
      {ipfsUrl ? (
        <IpfsLink>
          <a href={ipfsUrl} target="_blank" rel="noreferrer">
            See it on IPFS!
          </a>
        </IpfsLink>
      ) : (
        <>
          <H4 color="white">Integrate Sourcecred Data</H4>
          <Button onClick={handleSubmit}>Submit</Button>
          {loading && !ipfsUrl && <Spinner />}
        </>
      )}
    </Wrapper>
  )
}

export default SourcecredView
