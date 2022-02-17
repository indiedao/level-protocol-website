import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/dist/client/router'
import TokenView from '../../components/token/view/TokenView'

const Level = () => {
  const [config, setConfig] = useState()
  const router = useRouter()
  const { address } = router.query

  const loadConfig = async () => {
    // TODO: load config from db:

    setConfig({
      address: '0x99b9bB23D300Dda4A1dC9eb8d2333704b235c165',
      colorHue: 10,
      colorLightness: 75,
      nftAddress: '0xc0957ad0fc22ab988180772e96a8c29f2217e526',
      nftId: '346',
    })
  }

  useEffect(() => {
    loadConfig()
  }, [address])

  return (
    <div>
      <Head>
        <title>Level Protocol</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {address && (
          <TokenView
            address={router.query.address}
            nftId={config.nftId}
            nftAddress={config.nftAddress}
            colorHue={config.colorHue}
            colorLightness={config.colorLightness}
          />
        )}
      </main>
    </div>
  )
}

export default Level
