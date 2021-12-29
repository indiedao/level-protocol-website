import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { H2 } from './Typography'
import { CloseIcon, CollapseIcon, ZoomIcon } from './icons'

const Container = styled.div`
  align-self: start;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 6.6rem 1fr;
  min-height: calc(6.6rem + 0.4rem * 2);
  max-height: ${({ maxHeight }) => maxHeight};
  background-color: ${props => props.theme.colors.vibrantCream};
  border: 0.4rem solid ${props => props.theme.colors.vibrantBlack};
  border-radius: 1.6rem;
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
          ${bp.sm(` width: 80vw; max-width: 60rem; `)}
          ${bp.md(` width: 60rem; max-width: 120rem; `)}
          ${bp.lg(` width: 120rem; max-width: 156rem;`)}
          ${bp.xl(` width: 144rem; max-width: 80vw; `)}
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
  border-top-right-radius: 1.05rem;
  border-top-left-radius: 1.05rem;
  user-select: none;
`

const Title = styled(H2)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const TitleBarButton = styled.button`
  padding: 0;
  height: 4rem;
  width: 4rem;
  border: none;
  background: none;

  svg {
    width: inherit;
    height: inherit;
    object-fit: contain;
  }

  &:hover:not(:disabled) {
    filter: brightness(95%);
    background-color: ${props => props.theme.colors.vibrantCream};
  }

  &:active:not(:disabled) {
    filter: contrast(115%);
    background-color: ${props => props.theme.colors.vibrantCream};
  }
`

const Content = styled.div`
  height: auto;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rebeccapurple;
  border-top-style: solid;
  border-top-color: ${props => props.theme.colors.vibrantBlack};
  border-bottom-left-radius: 1.05rem;
  transition: max-height 233ms ease, border-top-width 233ms ease;
  transition-origin: center top;

  ${({ isCollapsed, maxHeight }) =>
    isCollapsed
      ? css`
          max-height: 0;
          border-top-width: 0;
        `
      : css`
          max-height: calc(${maxHeight} - 6.6rem - 0.4rem * 2);
          border-top-width: 0.4rem;
        `}

  ::-webkit-scrollbar {
    width: 40px;
  }

  ::-webkit-scrollbar-track-piece {
    background: ${props => props.theme.colors.vibrantCream}
      ${props => props.theme.halftones.md};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.vibrantBlack};
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: ${props => props.theme.colors.mutedBlack};
  }

  ::-webkit-scrollbar-thumb:active {
    background-color: ${props => props.theme.colors.mutedBlack};
  }
`

const LevelWindow = ({
  children,
  collapsed,
  enableActions,
  handleClose,
  maxHeight,
  maxWidth,
  title,
  zoomed,
}) => {
  const [isVisible, setVisible] = useState(true)
  const [isZoomed, setZoomed] = useState(zoomed)
  const [isCollapsed, setCollapsed] = useState(collapsed)

  const closeWindow = () => {
    setVisible(!isVisible)
    handleClose()
  }

  if (isVisible) {
    return (
      <Container isZoomed={isZoomed} maxHeight={maxHeight} maxWidth={maxWidth}>
        <TitleBar>
          <TitleBarButton
            onClick={closeWindow}
            type="button"
            disabled={!enableActions}
          >
            <CloseIcon />
          </TitleBarButton>
          <Title>{title}</Title>
          <TitleBarButton
            onClick={() => setZoomed(!isZoomed)}
            type="button"
            disabled={!enableActions}
          >
            <ZoomIcon />
          </TitleBarButton>
          <TitleBarButton
            onClick={() => setCollapsed(!isCollapsed)}
            type="button"
            disabled={!enableActions}
          >
            <CollapseIcon />
          </TitleBarButton>
        </TitleBar>
        <Content isCollapsed={isCollapsed} maxHeight={maxHeight}>
          {children}
        </Content>
      </Container>
    )
  }

  return null
}

LevelWindow.propTypes = {
  children: PropTypes.element.isRequired,
  collapsed: PropTypes.bool,
  enableActions: PropTypes.bool,
  handleClose: PropTypes.func,
  maxHeight: PropTypes.string,
  maxWidth: PropTypes.string,
  title: PropTypes.string.isRequired,
  zoomed: PropTypes.bool,
}

LevelWindow.defaultProps = {
  collapsed: false,
  enableActions: true,
  handleClose: () => null,
  maxHeight: '80vh',
  maxWidth: '80vw',
  zoomed: false,
}

export default LevelWindow
