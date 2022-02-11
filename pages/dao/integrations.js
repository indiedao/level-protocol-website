import { useRef, useState } from 'react'
import styled from 'styled-components'
import Head from 'next/head'

import { mapCoordinapeData } from '../../util/coordinape'
import { H4, H2 } from '../../components/ui/Typography'
import FileUploader from '../../components/ui/FileUploader'
import MenuBar from '../../components/ui/MenuBar'
import Button from '../../components/ui/Button'
import Link from '../../components/ui/Link'
import LevelWindow from '../../components/ui/LevelWindow'

import Public from '../../components/layouts/Public'

const PageContent = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  padding-top: 14.8rem;
  width: 100%;
`

const Article = styled.article`
  padding: 6.4rem;
`

const DashboardWrapper = styled.div`
  h2 {
    color: white;
    margin: 1.6rem 0 4.2rem;
  }
  h4 {
    margin: 1rem 0;
  }
  button {
    margin-bottom: 4rem;
  }
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

const Converter = () => {
  const [csvData, setCsvData] = useState([])
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

  return (
    <div>
      <Head>
        <title>Level Protocol - Rollup</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Public>
          <MenuBar>
            <Link href="/about">About</Link>
            <Link href="/join">Join</Link>
          </MenuBar>
          <PageContent>
            <LevelWindow
              backgroundColor="vibrantBlack"
              enableActions={false}
              maxHeight="75vh"
              title="Rollup"
            >
              <Article>
                <DashboardWrapper>
                  <H2>Submit Members Data</H2>
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
                </DashboardWrapper>
              </Article>
            </LevelWindow>
          </PageContent>
        </Public>
      </main>
    </div>
  )
}

export default Converter
