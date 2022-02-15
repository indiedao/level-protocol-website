import { useRef, useState } from 'react'
import styled from 'styled-components'
import { mapCoordinapeData } from '../../util/coordinape'
import { H4, H2, Body1 } from '../ui/Typography'
import FileUploader from '../ui/FileUploader'
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

const IntegrationView = () => {
  const [csvData, setCsvData] = useState([])
  const [membersData, setMembersData] = useState(null)
  const [loading, setLoading] = useState(false)
  const buttonRef = useRef()
  const { isAdmin, currentCommunity } = useCommunity()
  const { disconnect } = useWeb3()

  const handleOpenDialog = event => {
    if (buttonRef.current) {
      buttonRef.current.open(event)
    }
  }

  const handleOnFileLoad = data => setCsvData(mapCoordinapeData(data))

  const handleRemoveFile = event => {
    if (buttonRef.current && csvData) {
      buttonRef.current.removeFile(event)
      setCsvData(null)
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      setMembersData(null)
      const res = await fetch('/api/harness', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(csvData),
      })

      const { updatedData } = await res.json()
      setMembersData(updatedData)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleRollup = () => {
    // TODO:
    // - get the data from the ipfs
    // - parse the data
    // - rollup the data into skills
  }

  const ipfsUrl =
    membersData && membersData.cid
      ? `https://ipfs.io/ipfs/${membersData.cid}/level.json`
      : null

  const integrationsOptions = isAdmin ? (
    <>
      <IntegrationsHeader>
        <H2>{currentCommunity.name} Management</H2>
        <Button onClick={disconnect}>Disconnect</Button>
      </IntegrationsHeader>
      {ipfsUrl ? (
        <>
          <IpfsLink>
            <a href={ipfsUrl} target="_blank" rel="noreferrer">
              See it on IPFS!
            </a>
          </IpfsLink>

          <H4 color="white">Submit to LVL</H4>
          <Button onClick={handleRollup}>Rollup</Button>
        </>
      ) : (
        <>
          <FileUploader
            title="Upload your Coordinape Data File"
            buttonRef={buttonRef}
            handleOnFileLoad={handleOnFileLoad}
            handleRemoveFile={handleRemoveFile}
            handleOpenDialog={handleOpenDialog}
          />
          <H4 color="white">Update members data</H4>
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

export default IntegrationView
