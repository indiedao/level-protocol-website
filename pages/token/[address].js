import styled from 'styled-components'
import { useEffect, useState, useCallback } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/dist/client/router'
import TokenView from '../../components/token/view/TokenView'
import { Body1 } from '../../components/ui/Typography'

const Level = () => {
  const [config, setConfig] = useState()
  const router = useRouter()
  const { address } = router.query

  const loadConfig = useCallback(async () => {
    // TODO: load config from db:
    const _config = await fetch(`/api/members/${address}/config`, {
      method: 'GET',
    })

    console.log(_config)

    // setConfig(_config)

    setConfig({
      address: '0x99b9bB23D300Dda4A1dC9eb8d2333704b235c165',
      colorHue: 10,
      colorLightness: 75,
      nftAddress: '0xc0957ad0fc22ab988180772e96a8c29f2217e526',
      nftId: '346',
    })
  }, [address])

  useEffect(() => {
    loadConfig()
  }, [address, loadConfig])

  if (!address) return <Body1>Loading...</Body1>

  return (
    <div>
      <Head>
        <title>Level Protocol</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <Container>
            {config && (
              <TokenView
                address={router.query.address}
                nftId={config.nftId}
                nftAddress={config.nftAddress}
                colorHue={config.colorHue}
                colorLightness={config.colorLightness}
              />
            )}
          </Container>
        </Layout>
      </main>
    </div>
  )
}

const Layout = styled.div``

const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 600px;
`

export default Level
