import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { H2 } from './Typography'
import { CloseBoldIcon, CollapseBoldIcon, ZoomBoldIcon } from './icons'

const Container = styled.div`
  align-self: start;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 6.6rem 1fr;
  min-height: calc(6.6rem + 0.4rem * 2);
  max-height: ${({ maxHeight }) => maxHeight};
  background-color: ${props => props.theme.colors.vibrantCream};
  border: 0.4rem solid ${props => props.theme.colors.vibrantBlack};
  border-radius: 0.4rem;
  box-shadow: 1.6rem 1.6rem 0 ${props => props.theme.colors.vibrantBlack};
  transition: width 233ms ease, max-width 233ms ease;
  transition-origin: center top;

  ${({ isZoomed, maxWidth, theme: { bp } }) =>
    isZoomed
      ? css`
          width: ${maxWidth};
          max-width: ${maxWidth};
        `
      : css`
          ${bp.sm(' width: 80vw; max-width: 60rem; ')}
          ${bp.md(' width: 60rem; max-width: 120rem; ')}
          ${bp.lg(' width: 120rem; max-width: 156rem; ')}
          ${bp.xl(' width: 144rem; max-width: 80vw; ')}
        `}
`

const TitleBar = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr min-content min-content;
  justify-items: center;
  align-items: center;
  grid-gap: 1.6rem;
  padding: 0 1.8rem;
  color: ${props => props.theme.colors.mutedBlack};
  background-color: ${({ backgroundColor, theme }) =>
    theme.colors[backgroundColor || 'vibrantBlue']};
  user-select: none;
`

const Title = styled(H2)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${props => props.theme.colors.vibrantCream};
`

const TitleBarButton = styled.button`
  padding: 0;
  height: 4rem;
  width: 4rem;
  border: none;
  background: none;
  cursor: ${props => props.theme.cursors.default};

  svg {
    width: inherit;
    height: inherit;
    object-fit: contain;
  }
`

const Content = styled.div`
  height: auto;
  overflow-x: hidden;
  overflow-y: auto;
  border-top-style: solid;
  border-top-color: ${props => props.theme.colors.vibrantBlack};
  border-bottom-left-radius: 1.05rem;
  transition-origin: center top;
  background-color: ${({ backgroundColor, theme }) =>
    theme.colors[backgroundColor || 'mutedCream']};
`

const NonInteractiveWindow = ({
  children,
  maxHeight,
  maxWidth,
  title,
  titleBarBackgroundColor,
  contentBackgroundColor,
}) => {
  return (
    <Container maxHeight={maxHeight} maxWidth={maxWidth}>
      <TitleBar backgroundColor={titleBarBackgroundColor}>
        <TitleBarButton>
          <CloseBoldIcon />
        </TitleBarButton>
        <Title>{title}</Title>
        <TitleBarButton>
          <ZoomBoldIcon />
        </TitleBarButton>
        <TitleBarButton>
          <CollapseBoldIcon />
        </TitleBarButton>
      </TitleBar>
      <Content maxHeight={maxHeight} backgroundColor={contentBackgroundColor}>
        {children}
      </Content>
    </Container>
  )
}

NonInteractiveWindow.propTypes = {
  children: PropTypes.element.isRequired,
  maxHeight: PropTypes.string,
  maxWidth: PropTypes.string,
  title: PropTypes.string.isRequired,
  titleBarBackgroundColor: PropTypes.string,
  contentBackgroundColor: PropTypes.string,
}

NonInteractiveWindow.defaultProps = {
  maxHeight: '80vh',
  maxWidth: '80vw',
  titleBarBackgroundColor: 'vibrantBlue',
  contentBackgroundColor: 'mutedCream',
}

export default NonInteractiveWindow
