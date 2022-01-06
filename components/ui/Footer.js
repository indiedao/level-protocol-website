import PropTypes from 'prop-types'
import styled from 'styled-components'

import Link from 'next/link'
import { StyledLinkText, Body1 } from './Typography'
import theme from '../../util/theme'

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8rem;

  background: ${props => props.backgroundColor}
    ${props => props.theme.halftones.md};
`

const FooterLinksContainer = styled.div`
  display: flex;
  font-size: 2rem;
  line-height: 2rem;

  > :not([hidden]) ~ :not([hidden]) {
    border-right-width: 0;
    border-left-width: 0.1rem;
    border-left-style: solid;
    border-color: ${theme.colors.white};
  }
`

const FooterLink = styled.div`
  padding: 0 1.2rem;
`

const Copyright = styled.div`
  padding-top: 1.6rem;
  color: ${theme.colors.white};
`

const Footer = ({ backgroundColor }) => (
  <FooterContainer backgroundColor={backgroundColor}>
    <FooterLinksContainer>
      <FooterLink>
        <Link href="#TODO" passHref>
          <StyledLinkText>Website</StyledLinkText>
        </Link>
      </FooterLink>
      <FooterLink>
        <a
          href="https://docs.google.com/document/d/1mv4vfrYRBwc8nI7jGBoqDITV-desH_UhFNA3UW8dUnw/edit#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StyledLinkText>Whitepaper</StyledLinkText>
        </a>
      </FooterLink>
      <FooterLink>
        <a
          href="https://twitter.com/theindiedao"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StyledLinkText>Twitter</StyledLinkText>
        </a>
      </FooterLink>
      <FooterLink>
        <Link href="#TODO" passHref>
          <StyledLinkText>Discord</StyledLinkText>
        </Link>
      </FooterLink>
    </FooterLinksContainer>
    <Copyright>
      <Body1>Copyright © {new Date().getFullYear()} The IndieDAO</Body1>
    </Copyright>
  </FooterContainer>
)

Footer.propTypes = {
  backgroundColor: PropTypes.string,
}

Footer.defaultProps = {
  backgroundColor: `${theme.colors.vibrantBlack}`,
}

export default Footer
