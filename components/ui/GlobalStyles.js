import { createGlobalStyle } from 'styled-components'

import { H1Styles, H2Styles, H3Styles, H4Styles, Body1 } from './Typography'

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
    box-sizing: border-box;
    font-family: 'Work Sans', sans-serif;
    font-weight: 500;
  }
  h1 { ${H1Styles} }
  h2 { ${H2Styles} }
  h3 { ${H3Styles} }
  h4 { ${H4Styles} }
  p {
    margin: 0;
    ${Body1}
  }
  li {
    ${Body1}
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
    background: ${props => props.theme.colors.black};
  }
`

export default GlobalStyles
