import { createGlobalStyle } from 'styled-components'

import { hexToRgba } from '../../util/colors'
import {
  H1Styles,
  H2Styles,
  H3Styles,
  H4Styles,
  H5Styles,
  H6Styles,
  PStyles,
  AStyles,
  PCodeStyles,
  PreCodeStyles,
} from './Typography'

const GlobalStyles = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
    background-color: ${props =>
      props.theme.colors[props.bodyBackgroundColor || 'white']};
    color: ${props => props.theme.colors[props.bodyColor || 'black']};
    font-size: 62.5%; /* base 10 rems */
    min-height: 100vh;

    :root {
      --hue: 0;
    }
  }
  body.animate {
    background-color: hsl(var(--hue), 100%, 50%);
  }

  @font-face {
    font-family: "Geneva";
    src: url("/fonts/Geneva-Normal-Italic.ttf");
    font-style: italic, oblique;
    font-display: swap;
  }
  @font-face {
    font-family: "Geneva";
    src: url("/fonts/Geneval-Bold-Italic.ttf");
    font-style: italic, oblique;
    font-weight: bold;
    font-display: swap;
  }
  @font-face {
    font-family: "Geneva";
    src: url("/fonts/Geneva-Normal.ttf");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "Geneva";
    src: url("/fonts/Geneva-Bold.ttf");
    font-weight: 700;
    font-style: bold;
    font-display: swap;
  }

  * {
    box-sizing: border-box;
    font-family: 'Work Sans', sans-serif;
    font-weight: 500;
  }
  h1 { ${H1Styles} }
  h2 { ${H2Styles} }
  h3 { ${H3Styles} }
  h4 { ${H4Styles} }
  h5 { ${H5Styles} }
  h6 { ${H6Styles} }
  p {
    margin: 0;
    ${PStyles}
  }
  li {
    ${PStyles}
    padding: 5px 0;
    overflow: display;
  }
  /* Inline code block: */
  p > code {
    ${PCodeStyles}
  }
  /* Multiline code block: */
  pre > code {
    ${PreCodeStyles}
  }
  a:focus,
  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
    outline: none;
  }
  a {
    ${AStyles}
  }
  input {
    padding: 20px;
    width: 100%;
    font-size: 2rem;
    border-radius: 5px;
    border: 1px solid gray;
  }
  button {
    padding: 20px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid gray;
  }
  ::selection {
    background: ${props => props.theme.colors.black};
  }
  /* NProgress loader bar plugin: */
  #nprogress {
    width: 100%;
    position: absolute;
    top: 0;
    .bar {
      background-color: ${props => hexToRgba(props.theme.colors.black, 0.5)};
      height: 4px;
    }
  }
`

export default GlobalStyles
