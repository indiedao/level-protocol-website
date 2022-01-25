import { createGlobalStyle } from 'styled-components'

import {
  h1Styles,
  h2Styles,
  h3Styles,
  h4Styles,
  body1Styles,
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
    cursor: ${props => props.theme.cursors.default};
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
    ${body1Styles}
    box-sizing: border-box;
  }
  h1 { ${h1Styles} }
  h2 { ${h2Styles} }
  h3 { ${h3Styles} }
  h4 { ${h4Styles} }
  p {
    margin: 0;
    ${body1Styles}
  }
  ul {
    padding-inline-start: 1.1em;
  }
  ol {
    padding-inline-start: 1.25em;
  }
  li {
    ${body1Styles}
    padding: 5px 0;
    overflow: display;
  }
  a:focus,
  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
    outline: none;
    cursor: ${props => props.theme.cursors.select};
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
    cursor: ${props => props.theme.cursors.select};
  }
  ::selection {
    background: ${props => props.theme.colors.vibrantGreen};
  }
`

export default GlobalStyles
