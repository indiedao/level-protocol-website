import React from 'react'
import { addDecorator, addParameters } from '@storybook/react'
import { ThemeProvider } from 'styled-components'

import theme from '../util/theme'
import GlobalStyles from '../components/ui/GlobalStyles'

addDecorator(storyFn => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    {storyFn()}
  </ThemeProvider>
))

addParameters({
  viewport: {},
})
