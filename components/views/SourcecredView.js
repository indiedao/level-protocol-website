import { useState } from 'react'
import styled from 'styled-components'
import { H4, H2, Body1 } from '../ui/Typography'
import Button from '../ui/Button'
import useCommunity from '../hooks/useCommunity'
import useWeb3 from '../hooks/useWeb3'

const IntegrationsHeader = styled.div`
  margin-bottom: 3.6rem;
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

  const integrationsOptions = isAdmin ? (
    <>
      <IntegrationsHeader>
        <H2>{currentCommunity.name} Sourecred Integration</H2>
        <Button onClick={disconnect}>Disconnect</Button>
      </IntegrationsHeader>
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
    </>
  ) : (
    <>
      <Body1 color="white">You do not have enough permissions.</Body1>
      <Button onClick={disconnect}>Disconnect</Button>
    </>
  )

  return integrationsOptions
}

export default SourcecredView
