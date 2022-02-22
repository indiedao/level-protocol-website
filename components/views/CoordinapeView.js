import { useRef, useState } from 'react'
import styled from 'styled-components'
import { mapCoordinapeData } from '../../util/coordinape'
import { H4, H3 } from '../ui/Typography'
import FileUploader from '../ui/FileUploader'
import Button from '../ui/Button'
import useCommunity from '../hooks/useCommunity'

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

const IntegrationView = () => {
  const [csvData, setCsvData] = useState(null)
  const [membersData, setMembersData] = useState(null)
  const [loading, setLoading] = useState(false)
  const buttonRef = useRef()

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
      const res = await fetch('/api/webhooks/coordinape', {
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
          <FileUploader
            title="Upload your Coordinape Data File"
            buttonRef={buttonRef}
            handleOnFileLoad={handleOnFileLoad}
            handleRemoveFile={handleRemoveFile}
            handleOpenDialog={handleOpenDialog}
          />
          {csvData && (
            <>
              <H4 color="white">Integrate Data</H4>
              <Button onClick={handleSubmit}>Submit</Button>
            </>
          )}

          {loading && !ipfsUrl && <Spinner />}
        </>
      )}
    </Wrapper>
  )
}

export default IntegrationView
