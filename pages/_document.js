import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

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
          ></link>
          <link rel="stylesheet" href="https://fontlibrary.org/face/chicagoflf" type="text/css"></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono&amp;display=swap"
            rel="stylesheet"
          ></link>
          <link
            rel="preload"
            href="/fonts/Geneva-Bold-Italic.ttf"
            as="font"
            crossOrigin=""
          ></link>
          <link
            rel="preload"
            href="/fonts/Geneva-Bold.ttf"
            as="font"
            crossOrigin=""
          ></link>
          <link
            rel="preload"
            href="/fonts/Geneva-Normal-Italic.ttf"
            as="font"
            crossOrigin=""
          ></link>
          <link
            rel="preload"
            href="/fonts/Geneva-Normal-Italic.ttf"
            as="font"
            crossOrigin=""
          ></link>
          <link
            rel="preload"
            href="/fonts/Geneva-Normal.ttf"
            as="font"
            crossOrigin=""
          ></link>
          <link
            rel="preload"
            href="/fonts/Geneva-Regular.ttf"
            as="font"
            crossOrigin=""
          ></link>
          {/* yo mismo pegue las fuentes geneva aqui!! vvvvvvvv */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
