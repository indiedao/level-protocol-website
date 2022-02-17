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

  ${props => props.theme.bp.xs(' flex-direction: column; ')}

  ${props => props.theme.bp.sm(' flex-direction: column; ')}

  > *:nth-child(n + 2) {
    border-color: ${props => props.theme.colors.trueWhite};

    ${props => props.theme.bp.xs(' margin: 1.2rem 0 0; text-align: center; ')}

    ${props => props.theme.bp.sm(' margin: 1.2rem 0 0; text-align: center; ')}

    ${props =>
      props.theme.bp.mdPlus(
        ' margin-left: 1.2rem; padding-left: 1.2rem; border-left-width: 0.1rem; border-left-style: solid; ',
      )}
  }
`

const Copyright = styled.div`
  padding: 1.6rem 2rem 0;
  color: ${props => props.theme.colors.trueWhite};
  text-align: center;
`

const NoBreak = styled.span`
  white-space: nowrap;
`

const Footer = () => (
  <FooterContainer>
    <FooterLinksContainer>
      <Link
        href="https://docs.google.com/document/d/1mv4vfrYRBwc8nI7jGBoqDITV-desH_UhFNA3UW8dUnw/edit#"
        target="_blank"
        rel="noopener"
      >
        Technical Specification
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
      <Body1>
        <NoBreak>Copyright ©{new Date().getFullYear()}</NoBreak>{' '}
        <NoBreak>The IndieDAO</NoBreak>
      </Body1>
    </Copyright>
  </FooterContainer>
)

export default Footer
