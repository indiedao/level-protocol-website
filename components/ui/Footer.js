import styled from 'styled-components'

import { Body1 } from './Typography'
import Link from './Link'

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8rem 0;

  background: transparent ${props => props.theme.halftones.md};
`

const FooterLinksContainer = styled.nav`
  display: flex;
  font-size: 2rem;
  line-height: 2rem;

  > *:nth-child(n + 2) {
    margin-left: 1.2rem;
    padding-left: 1.2rem;
    border-right-width: 0;
    border-left-width: 0.1rem;
    border-left-style: solid;
    border-color: ${props => props.theme.colors.trueWhite};
  }
`

const Copyright = styled.div`
  padding-top: 1.6rem;
  color: ${props => props.theme.colors.trueWhite};
`

const Footer = () => (
  <FooterContainer>
    <FooterLinksContainer>
      <Link
        href="https://docs.google.com/document/d/1mv4vfrYRBwc8nI7jGBoqDITV-desH_UhFNA3UW8dUnw/edit#"
        target="_blank"
        rel="noopener"
      >
        Whitepaper
      </Link>
      <Link
        href="https://twitter.com/lvlprotocol"
        target="_blank"
        rel="noopener"
      >
        Twitter
      </Link>
      <Link
        href="https://twitter.com/theindiedao"
        target="_blank"
        rel="noopener"
      >
        IndieDAO
      </Link>
    </FooterLinksContainer>
    <Copyright>
      <Body1>Copyright © {new Date().getFullYear()} The IndieDAO</Body1>
    </Copyright>
  </FooterContainer>
)

Footer.propTypes = {}

Footer.defaultProps = {}

export default Footer
