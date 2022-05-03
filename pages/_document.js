import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

// TODO: move to constants util file
const origin = process.env.NEXT_PUBLIC_ORIGIN
const title = process.env.NEXT_PUBLIC_SITE_TITLE
const description = process.env.NEXT_PUBLIC_SITE_DESCRIPTION
const twitterUsername = process.env.NEXT_PUBLIC_TWITTER_USERNAME
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
            href="/fonts/alagard.ttf"
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
          <link rel="icon" href="/images/favicons/favicon.ico" sizes="any" />
          <link
            rel="icon"
            href="/images/favicons/favicon.svg"
            type="image/svg+xml"
          />
          <link
            rel="apple-touch-icon"
            href="/images/favicons/apple-touch-icon.png"
          />
          <link rel="manifest" href="/manifest.webmanifest" />
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
