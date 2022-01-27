import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

const origin = process.env.NEXT_PUBLIC_ORIGIN || 'https://lvlprotocol.xyz'
const title = process.env.NEXT_PUBLIC_SITE_TITLE || 'Level Protocol'
const description =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
  'lvl is a crypto resume: Level is an on-chain reputation and skills web3 resume that highlights all of your contributions across communities, DAOs, and metaverses'
const twitterUsername =
  process.env.NEXT_PUBLIC_TWITTER_USERNAME || 'lvlprotocol'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    const isProduction = process.env.NODE_ENV === 'production'

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
        isProduction,
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600&amp;display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://fontlibrary.org/face/chicagoflf"
            type="text/css"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono&amp;display=swap"
            rel="stylesheet"
          />
          <link
            rel="preload"
            href="/fonts/Geneva-Bold-Italic.ttf"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Geneva-Bold.ttf"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Geneva-Normal-Italic.ttf"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Geneva-Normal-Italic.ttf"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Geneva-Normal.ttf"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Geneva-Regular.ttf"
            as="font"
            crossOrigin=""
          />
          {['16x16', '32x32', '96x96'].map(size => (
            <link
              rel="icon"
              type="image/png"
              href={`/images/favicons/favicon-${size}.png`}
              sizes={size}
              key={size}
            />
          ))}
          {['120x120', '152x152', '167x167', '180x180', '512x512'].map(size => (
            <link
              rel="apple-touch-icon"
              type="image/png"
              href={`/images/favicons/apple-touch-icon-${size}.png`}
              sizes={size}
              key={size}
            />
          ))}
          <meta name="msapplication-TileColor" content="#d7d7d7" />
          <meta name="msapplication-TileImage" content="/browserconfig.xml" />
          <meta
            name="twitter:image"
            content={`${origin}/images/favicons/share.png`}
          />
          <meta
            property="og:image"
            content={`${origin}/images/favicons/share.png`}
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta name="description" content={description} />
          <meta name="twitter:description" content={description} />
          <meta property="og:description" content={description} />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={title} />
          <meta property="og:url" content={origin} />
          <meta name="twitter:site" content={twitterUsername} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
