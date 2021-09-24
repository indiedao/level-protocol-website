import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from '@apollo/react-hooks'

import { useApollo } from '../util/apolloClient'
import theme, { queries } from '../util/theme'
import GlobalStyles from '../components/ui/GlobalStyles'
import { BreakpointProvider } from '../components/context/BreakpointContext'

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)
  return (
    <>
      <Head>
        <meta name="description" content="Level Procol." />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ApolloProvider client={apolloClient}>
          <BreakpointProvider queries={queries}>
            <Component {...pageProps} />
          </BreakpointProvider>
        </ApolloProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
