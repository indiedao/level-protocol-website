import React from 'react'
import { addDecorator, addParameters } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import * as NextImage from 'next/image'

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
  controls: { expanded: true },
})

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => (
    <OriginalNextImage
      {...props}
      unoptimized
    />
  ),
})
