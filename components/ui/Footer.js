import styled from 'styled-components'

import { StyledLinkText, Body1 } from './Typography'
import theme from '../../util/theme'

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8rem;

  background: transparent ${props => props.theme.halftones.md};
`

const FooterLinksContainer = styled.nav`
  display: flex;
  font-size: 2rem;
  line-height: 2rem;

  > *:nth-child(n + 2) {
    border-right-width: 0;
    border-left-width: 0.1rem;
    border-left-style: solid;
    border-color: ${theme.colors.white};
  }
`

const A = styled.a`
  padding: 0 1.2rem;
`

const Copyright = styled.div`
  padding-top: 1.6rem;
  color: ${theme.colors.white};
`

const Footer = () => (
  <FooterContainer>
    <FooterLinksContainer>
      <A
        href="https://docs.google.com/document/d/1mv4vfrYRBwc8nI7jGBoqDITV-desH_UhFNA3UW8dUnw/edit#"
        target="_blank"
        rel="noopener noreferrer"
      >
        <StyledLinkText>Whitepaper</StyledLinkText>
      </A>
      <A
        href="https://twitter.com/lvlprotocol"
        target="_blank"
        rel="noopener noreferrer"
      >
        <StyledLinkText>Twitter</StyledLinkText>
      </A>
      <A
        href="https://twitter.com/theindiedao"
        target="_blank"
        rel="noopener noreferrer"
      >
        <StyledLinkText>IndieDAO</StyledLinkText>
      </A>
      <A
        href="https://indiedao.gitbook.io/indiedao"
        target="_blank"
        rel="noopener noreferrer"
      >
        <StyledLinkText>Gitbook</StyledLinkText>
      </A>
    </FooterLinksContainer>
    <Copyright>
      <Body1>Copyright © {new Date().getFullYear()} The IndieDAO</Body1>
    </Copyright>
  </FooterContainer>
)

Footer.propTypes = {}

Footer.defaultProps = {}

export default Footer
