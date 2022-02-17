import styled, { css } from 'styled-components'
import { useEffect, useState, useCallback } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/dist/client/router'
import TokenView from '../../components/token/view/TokenView'
import { Body1 } from '../../components/ui/Typography'
import { A, H4 } from '../../components/ui/AltTypography'
import theme from '../../util/theme'

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
                backgroundColor={theme.colors.vibrantBlack}
              />
            )}
            <Callout>
              <H4 color="vibrantPixel">lvl coming soon</H4>
              <A href="https://twitter.com/lvlprotocol" target="_blank">
                @lvlprotocol
              </A>
            </Callout>
          </Container>
        </Layout>
      </main>
    </div>
  )
}

const Layout = styled.div`
  ${props => css`
    background-color: ${props.theme.colors.vibrantScreen};
    height: 100vh;
    display: flex;
    justify-content: center;
    background-color: ${props.theme.colors.vibrantBlack};
  `}
`

const Container = styled.div`
  height: 100%;
  width: 100%;
  max-width: 600px;
  display: grid;
  grid-template-rows: auto 60px;
  padding: 80px 50px;
`

const Callout = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default Level
