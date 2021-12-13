import { useRef, useState } from 'react'
import styled from 'styled-components'
import Head from 'next/head'

import { mapCoordinapeData } from '../util/coordinape'
import { getEcosystems } from '../util/fauna'
import { H2, H6, Body1 } from '../components/ui/Typography'
import FileUploader from '../components/ui/FileUploader'
import Web3Layout from '../components/layouts/Web3Layout'
import { entropyToMnemonic } from '@ethersproject/hdnode'

const Dashboard = ({ communities }) => {
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
            <FileUploader
              title={'Upload your Coordinape Data File'}
              buttonRef={buttonRef}
              handleOnFileLoad={handleOnFileLoad}
              handleOnError={handleOnError}
              handleSubmit={handleSubmit}
              handleOnRemoveFile={handleOnRemoveFile}
              handleOpenDialog={handleOpenDialog}
            />
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

export async function getServerSideProps(context) {
  // Query all entries from Fauna
  const entries = await getEcosystems('Ox')
  const ecosystems = entries.map(entry => entry.data)

  // Pass entry data to the page via props
  return {
    props: { ecosystems },
  }
}
