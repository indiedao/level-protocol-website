import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from '@apollo/react-hooks'

import { useApollo } from '../util/apolloClient'
import { ScrollProvider } from '../components/contexts/ScrollContext'
import { Web3Provider } from '../components/contexts/Web3Context'
import { CommunityProvider } from '../components/contexts/CommunityContext'
import theme from '../util/theme'
import GlobalStyles from '../components/ui/GlobalStyles'

const MyApp = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps)
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyles
          bodyColor="vibrantWhite"
          bodyBackgroundColor="mutedBlack"
        />
        <ApolloProvider client={apolloClient}>
          <Web3Provider>
            <CommunityProvider>
              <ScrollProvider>
                <Component {...pageProps} />
              </ScrollProvider>
            </CommunityProvider>
          </Web3Provider>
        </ApolloProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
