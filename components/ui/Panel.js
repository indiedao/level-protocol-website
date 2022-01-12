import PropTypes from 'prop-types'
import styled from 'styled-components'
import Elevation from './Elevation'
import { H3, Body2 } from './Typography'

const Container = styled(Elevation)`
  border-radius: 0.4rem 2.4rem;
  color: white;
  background: linear-gradient(
    137.95deg,
    ${props => props.theme.colors.mutedBlack} 14.79%,
    ${props => props.theme.colors.vibrantBlack} 54.22%,
    ${props => props.theme.colors.mutedBlack} 88.11%
  );
  padding: 4.8rem 6.4rem;
`

const PanelIllustration = styled.div`
  margin-bottom: 2.4rem;
`

const PanelTitle = styled(H3)`
  color: ${props => props.theme.colors.trueWhite};
`

const PanelContent = styled(Body2)`
  color: ${props => props.theme.colors.trueWhite};
`

const Panel = ({ illustration, title, children }) => {
  return (
    <Container>
      {illustration && <PanelIllustration>{illustration}</PanelIllustration>}
      {title && <PanelTitle>{title}</PanelTitle>}
      <PanelContent>{children}</PanelContent>
    </Container>
  )
}

Panel.propTypes = {
  illustration: PropTypes.element,
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
}

Panel.defaultProps = {
  illustration: null,
  title: null,
}

export default Panel
