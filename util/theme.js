const checkerboardSvgUrl =
  'url(\'data:image/svg+xml;utf8,<svg height="4" viewBox="0 0 4 4" width="4" xmlns="http://www.w3.org/2000/svg"><g fill="%23000" fill-rule="evenodd"><path d="m0 0h2v2h-2z"/><path d="m2 2h2v2h-2z"/></g></svg>\')'

const offsetDotSvgUrl =
  'url(\'data:image/svg+xml;utf8,<svg height="4" viewBox="0 0 8 4" width="8" xmlns="http://www.w3.org/2000/svg"><g fill="%23000" fill-rule="evenodd"><path d="m0 0h2v2h-2z"/><path d="m4 2h2v2h-2z"/></g></svg>\')'

const offsetRoundedDotSvgUrl =
  'url(\'data:image/svg+xml;utf8,<svg height="15" viewBox="0 0 10 15" width="10" xmlns="http://www.w3.org/2000/svg"><g fill="%23000" fill-rule="evenodd"><rect height="5" rx="1" width="5"/><rect height="5" rx="1" width="5" x="5" y="7.5"/></g></svg>\')'

export const defaultPointerUrl =
  "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAABACAYAAABhspUgAAAAzklEQVRoge3Zyw6DIBRFUWj6/79Mp+3R8Ige4dK9Z8aADFauMeZSSkn1cuP+o71WOkxPHNjdW/fP+ZfsifGppiHhLr5hbTXTkHC3n2FttmlIuNvfsPa0aUi4+z/Dmts0JNxhWLvbNCTcYbjVVdOQcIfh0UZNQ8IdhrX2L5T2Ft8XkHC3v2E1qXO0I77pli7cgQ//mk/e7Yc1cl1dr3XsVw0S7uLP4avG3EHCXfw5fINZ61yGhLuQc3ipOdsKEu5CzmH3M0YfwByeWqwDp5Q+NylFhR7a21kAAAAASUVORK5CYII=')"

export const selectPointerUrl =
  "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAABACAYAAABGHBTIAAABA0lEQVRoge2aUQ7CIBAFwXgNjfc/ldGD4K/dNsVtt4CvM39GK93kTVg25OTkcbtPnnm+X8X8g/1sca8ZyaXn4j2gYHUifJo4W8q6wjnPlmzqNJFWh4LVoWB1KFgdClbndAVfB3iH2vm5hqsXJ9LqnM/hH2ZUh+I9P9vf55xdMzQirQ4zrQ1z5V0zrQCHXd8TaXVO6fDeufKE2vOtweEB3qEpnIdr1Pa50SHS6tBLe/dl94LBvbG3byDS6rAPW6/tzGi0XtkLkVYHh/+d2j0wIq0ODi8gtS8TaXU4D2+gq9Pe+9dEWh0cDiDUae+MC4cNFKzO4Q4HsHqnZAEc/oaCpUkpfQBcC0+GZGwPugAAAABJRU5ErkJggg==')"

export const busyPointerUrl =
  "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABhklEQVR4Xu2a4RKDIAyD9f0f2t3uNk/FEWpb0fnt58AqaZJWcBzif1NwyDE43ipcRnAACM5YRpLmR8wI/vcMCF3gNNXDjaPMkZxQY+SRiwEgUuMw4AYSCKX8lj2KAYptOx5hknXLZABQWfCMwwDhAQrcDAmkUj7aA7bxrIDseQAAKNpFjns9AAZsEEAC5btDtdTjATt6xgQjTU7FuoIJnprx7D7AWhXeHgAAiqaZ49ESgAHGvgAJ4AGYIFWgaxnMrDA/Yq/a/+4mCADnIwADlpgXEujQmZ3NgToDAMC5Ta3S2XDaq0J4x2EAHrBAABPcvgxhgg80wWKbbvlHNCM6VAHfuQAABEsCBujP3ryNTrEvWgsoj8aQABKI3TDCA27gAal9wQkMaPn0b15jy+SVBrymCAD5EmhJKgz4ImBC63NRtSwoiSRI4MgaTAyomqL1gwcAiPcAGOB5eXCh9+PGsa3jMGQ8o8sDFOAAoBAyjsMAI2Cm6anomp6k02QA6AT8ZW77eAa8AJt0zEEhpQYlAAAAAElFTkSuQmCC')"

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

  halftones: {
    xs: `left top/0.1rem ${checkerboardSvgUrl}`,
    sm: `left top/0.3rem ${checkerboardSvgUrl}`,
    md: `left top/0.8rem ${offsetDotSvgUrl}`,
    lg: `left top/1rem ${offsetRoundedDotSvgUrl}`,
  },

  fontStacks: {
    chicago: 'ChicagoFLFRegular, sans-serif',
    geneva: 'Geneva, Verdana',
  },

  cursors: {
    default: `${defaultPointerUrl}, default`,
    select: `${selectPointerUrl}, pointer`,
    busy: `${busyPointerUrl}, wait`,
  },
}

export default theme
