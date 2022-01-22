import { useRef, useState } from 'react'
import styled from 'styled-components'
import Head from 'next/head'

import { mapCoordinapeData } from '../util/coordinape'
import { H2 } from '../components/ui/Typography'
import FileUploader from '../components/ui/FileUploader'
import Web3Layout from '../components/layouts/Web3Layout'
import Button from '../components/ui/Button'

const Converter = () => {
  const [csvData, setCsvData] = useState([])
  const [membersData, setMembersData] = useState([])
  const buttonRef = useRef()

  const handleOpenDialog = event => {
    if (buttonRef.current) {
      buttonRef.current.open(event)
    }
  }

  const handleOnFileLoad = data => setCsvData(mapCoordinapeData(data))

  const handleOnError = err => {
    console.log('---------------------------')
    console.log(err)
    console.log('---------------------------')
  }

  const handleOnRemoveFile = data => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  const handleRemoveFile = event => {
    if (buttonRef.current && csvData) {
      buttonRef.current.removeFile(event)
      setCsvData(null)
    }
  }

  const handleSubmit = async () => {
    const result = await fetch('/api/harness', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(csvData),
    })

    setMembersData(result)
  }

  return (
    <div>
      <Head>
        <title>Level Protocol</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Web3Layout>
          <Layout>
            {membersData ? (
              <div>
                <H2>Upload Coordinape Data</H2>
                <FileUploader
                  title="Upload your Coordinape Data File"
                  buttonRef={buttonRef}
                  handleOnFileLoad={handleOnFileLoad}
                  handleOnError={handleOnError}
                  handleRemoveFile={handleRemoveFile}
                  handleOnRemoveFile={handleOnRemoveFile}
                  handleOpenDialog={handleOpenDialog}
                />
                <H2>Update members data</H2>
                <Button onClick={handleSubmit}>Submit</Button>
              </div>
            ) : (
              <div>
                <H2>Data Updated</H2>
                <pre>{result}</pre>
              </div>
            )}
          </Layout>
        </Web3Layout>
      </main>
    </div>
  )
}

const Layout = styled.div`
  margin: 0 auto;
  max-width: 900px;
  display: grid;
  grid-row-gap: 40px;
  justify-content: center;
  padding-top: 180px;
`

export default Converter
