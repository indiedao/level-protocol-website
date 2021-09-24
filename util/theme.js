export const queries = {
  base: '(max-width: 479px)',
  sm: '(min-width: 480px) and (max-width: 767px)',
  md: '(min-width: 768px) and (max-width: 1279px)',
  lg: '(min-width: 1280px) and (max-width: 1559px)',
  xl: '(min-width: 1560px)',
  portrait: '(orientation: portrait)', // we can check orientation also
};

const theme = {
  bp: {
    base: style =>
      `@media only screen and ${queries.base} { ${style} }`,
    sm: style =>
      `@media only screen and ${queries.sm} { ${style} }`,
    md: style =>
      `@media only screen and ${queries.md} { ${style} }`,
    lg: style =>
      `@media only screen and ${queries.lg} { ${style} }`,
    xl: style => `@media only screen and ${queries.xl} { ${style} }`,
    portrait: style => `@media only screen and ${queries.portrait} { ${style} }`,
  },

  colors: {
    primary900: '#680E0D',
    primary800: '#972524',
    primary700: '#D64342',
    primary600: '#E95756',
    primary500: '#FF7271',
    primary400: '#FB8A89',
    primary300: '#FFA5A4',
    primary200: '#FFB9B8',
    primary100: '#FFCFD2',
    primary050: '#FFEAEB',
    secondary900: '#0B2530',
    secondary800: '#123D40',
    secondary700: '#2A6565',
    secondary600: '#268686',
    secondary500: '#40A4A4',
    secondary400: '#54C7C7',
    secondary300: '#73DADA',
    secondary200: '#97E4E4',
    secondary100: '#BCEBEB',
    secondary050: '#D5F9F7',
    neutral900: '#202022',
    neutral800: '#424246',
    neutral700: '#595A60',
    neutral600: '#797B82',
    neutral500: '#A3A4A9',
    neutral400: '#C0C2C9',
    neutral300: '#D4D5DA',
    neutral200: '#E5E6EA',
    neutral100: '#F2F3F6',
    neutral050: '#FBFCFF',
    neutral000: '#FFFFFF',
  },
}

export default theme
