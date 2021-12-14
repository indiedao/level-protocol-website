import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from '@apollo/react-hooks'

import { useApollo } from '../util/apolloClient'
import theme from '../util/theme'
import GlobalStyles from '../components/ui/GlobalStyles'

const MyApp = ({ Component, pageProps }) => {
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
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
