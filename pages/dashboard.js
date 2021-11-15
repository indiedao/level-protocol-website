import { useRef, useState } from 'react'
import styled from 'styled-components'
import { CSVReader } from 'react-papaparse'
import Head from 'next/head'

import { mapCoordinapeData } from '../util/coordinape'
import { H2, H6, Body1 } from '../components/ui/Typography'
import { Button } from '../components/ui/Buttons'
import Web3Layout from '../components/layouts/Web3Layout'

const ProcessFileControlsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Dashboard = () => {
  const [csvData, setCsvData] = useState([])
  const buttonRef = useRef()

  const handleOpenDialog = e => {
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  const handleOnFileLoad = data => {
    console.log('data', data)
    setCsvData(mapCoordinapeData(data))
  }

  const handleOnError = (err, file, inputElem, reason) => {
    console.log('---------------------------')
    console.log(err)
    console.log('---------------------------')
  }

  const handleOnRemoveFile = data => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  const handleRemoveFile = e => {
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }

  const handleSubmit = async () => {
    console.log('csvData', csvData)
    const res = await fetch('/api/harness', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(csvData),
    })
    handleRemoveFile()
    console.log('data uploaded', res.json())
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
            <H2>Dashboard</H2>
            <H6>Submit your Coordinape epoch CSV</H6>
            <CSVReader
              ref={buttonRef}
              onFileLoad={handleOnFileLoad}
              onError={handleOnError}
              noClick
              noDrag
              onRemoveFile={handleOnRemoveFile}
            >
              {({ file }) => (
                <div>
                  {file && file.name ? (
                    <>
                      <ProcessFileControlsContainer>
                        <Button onClick={handleRemoveFile}>Remove</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                      </ProcessFileControlsContainer>
                      <Body1>You are uploading {file && file.name}</Body1>
                    </>
                  ) : (
                    <Button onClick={handleOpenDialog}>Browse file</Button>
                  )}
                </div>
              )}
            </CSVReader>
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

const LinkLayout = styled.div`
  display: flex;
  justify-content: center;
`
export default Dashboard
