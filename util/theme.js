const checkerboardSvgUrl =
  'url(\'data:image/svg+xml;utf8,<svg height="4" viewBox="0 0 4 4" width="4" xmlns="http://www.w3.org/2000/svg"><g fill="%23000" fill-rule="evenodd"><path d="m0 0h2v2h-2z"/><path d="m2 2h2v2h-2z"/></g></svg>\')'

const offsetDotSvgUrl =
  'url(\'data:image/svg+xml;utf8,<svg height="4" viewBox="0 0 8 4" width="8" xmlns="http://www.w3.org/2000/svg"><g fill="%23000" fill-rule="evenodd"><path d="m0 0h2v2h-2z"/><path d="m4 2h2v2h-2z"/></g></svg>\')'

const offsetRoundedDotSvgUrl =
  'url(\'data:image/svg+xml;utf8,<svg height="15" viewBox="0 0 10 15" width="10" xmlns="http://www.w3.org/2000/svg"><g fill="%23000" fill-rule="evenodd"><rect height="5" rx="1" width="5"/><rect height="5" rx="1" width="5" x="5" y="7.5"/></g></svg>\')'

export const defaultPointerUrl =
  // eslint-disable-next-line prettier/prettier
  'url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACWSURBVHgB3ZbRCsAgCEVt7P9/uTXYBZEctSWp5yUqerhHqQp1qA0+Lw0y4qDNnG+bCA4jFiZ8GwCWJmIYABYmYhkAK03ENABWmIhtAPwxkcMA+GIilwEwYyKHAfGB6u2rJmIZQFKtpHlvQpa8PHPUlPiY7yaUyS3YbqCbbLSWshfYOo2cv/HZA5Y1l/jsgVmq8hiE6IELDUZLeXFsyuYAAAAASUVORK5CYII=\')'

export const selectPointerUrl =
  // eslint-disable-next-line prettier/prettier
  'url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAC1SURBVHgB7VfRDoAgCITW//+yZavNUBSdITbvxSlT4QaHIuSB9+jISO3N2GAwpBFckTv3JgARa8+JMJyB5cByYIc+cAU7WyVmGKCKVwVOH571c84qqBkGPtP6EAlG0EwvKGk9pOzNlwY9xLYQ+Yh7Rd3kgAZolidzgd0c13t2TveBxRzwrqH3kFaAlgPq6NUNRUi9Ic3qgFouzP0vEF+S+T9Mw8ADEROcIsJvGKg4t/jCGs7AAatGPE9tNKGbAAAAAElFTkSuQmCC\')'


export const busyPointerUrl =
  // eslint-disable-next-line prettier/prettier
  'url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACNSURBVHgB7VdBCsAwCNOx/3/ZMUbLVrYS9aAd5tSDJW0SUJlwCFjHpMBGwZi9FvqxyLOMmTUcORVAvb6KZV5+U+RViVQKqH7eLwl27UuJcAXqAacfJu8b0Ax0wiELZcH6GXByxyuwt4MjzS5UCPN1Q0N383CWBYlnQsWs5+FaaC8A5n8LR24FRvxzNywcRYYiNQ/1xLsAAAAASUVORK5CYII=\')'

const theme = {
  bp: {
    sm: style => `@media only screen and (max-width: 767px) { ${style} }`,
    md: style =>
      `@media only screen and (min-width: 768px) and (max-width: 1279px) { ${style} }`,
    lg: style =>
      `@media only screen and (min-width: 1280px) and (max-width: 1560px) { ${style} }`,
    lgPlus: style => `@media only screen and (min-width: 1280px) { ${style} }`,
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
