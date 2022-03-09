import styled, { css } from 'styled-components'
import { useEffect, useState, useCallback } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/dist/client/router'
import TokenView from '../../components/token/view/TokenView'
import { Body1 } from '../../components/ui/Typography'
import { A, H4 } from '../../components/ui/AltTypography'
import theme from '../../util/theme'

const Level = () => {
  const [member, setMember] = useState()
  const router = useRouter()
  const { address } = router.query

  useEffect(() => {
    const loadConfig = async () => {
      const resp = await fetch('/api/get-member', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address,
        }),
      })
      const json = await resp.json()

      if (!json?.data?.member) {
        router.push('/404')
      }

      setMember(json.data.member)
    }

    if (address) loadConfig()
  }, [address, router])

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
            {member && (
              <TokenView
                address={router.query.address}
                nftId={member.nftId}
                nftAddress={member.nftAddress}
                colorHue={member.colorHue}
                colorLightness={member.colorLightness}
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
