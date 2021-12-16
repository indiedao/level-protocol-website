const theme = {
  bp: {
    sm: style => `@media only screen and (max-width: 767px) { ${style} }`,
    md: style =>
      `@media only screen and (min-width: 768px) and (max-width: 1279px) { ${style} }`,
    lg: style =>
      `@media only screen and (min-width: 1280px) and (max-width: 1560px) { ${style} }`,
    xl: style => `@media only screen and (min-width: 1560px) { ${style} }`,
  },

  colors: {
    trueBlack: '#000000',
    trueWhite: '#ffffff',
    vibrantBlack: '#212125',
    vibrantCream: '#efecd3',
    vibrantRed: '#eb4130',
    vibrantGreen: '#76f651',
    vibrantBlue: '#3872f5',
    mutedBlack: '#302f2c',
    mutedCream: '#d6d1be',
    mutedRed: '#c9734c',
    mutedGreen: '#99caaa',
    mutedBlue: '#6c7894',
    black: '#000000',
    white: '#ffffff',
    base900: '#0d1034', // deprecated
    base700: '#3b4472', // deprecated
    base100: '#e1e4f0', // deprecated
    primary100: '#cafee8', // deprecated
  },
}

export default theme
