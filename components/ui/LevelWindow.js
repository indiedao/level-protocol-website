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

const sharedScrollButtonStyles = css`
  display: block;
  width: inherit;
  height: 4.4rem;
  background-color: ${props => props.theme.colors.vibrantBlack};
  background-repeat: no-repeat, no-repeat;
`

const sharedScrollButtonHoverStyles = css`
  background-color: ${props => props.theme.colors.mutedBlack};
`

const sharedStartScrollButtonStyles = css`
  ${sharedScrollButtonStyles}
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAIAQAAAABGt0WaAAAAEUlEQVR4AWMIhQOGVXBAuSgAkMYn2b1UVnQAAAAASUVORK5CYII='), url('data:image/svg+xml;utf8,<svg fill="none" height="14" viewBox="0 0 19 14" width="19" xmlns="http://www.w3.org/2000/svg"><path d="m10.7163 1.53979 6.9155 9.58241c.716.992.0071 2.3778-1.2163 2.3778h-13.831c-1.22341 0-1.932276-1.3858-1.21633-2.3778l6.9155-9.58241c.59871-.829585 1.83393-.829585 2.43263 0z" fill="%23efecd3" stroke="%23efecd3"/></svg>');
  background-position: left bottom, center calc(50% - 0.4rem);
  background-size: 4rem 0.4rem, 1.9rem 1.4rem;
`

const sharedEndScrollButtonStyles = css`
  ${sharedScrollButtonStyles}
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAIAQAAAABGt0WaAAAAEUlEQVR4AWMIhQOGVXBAuSgAkMYn2b1UVnQAAAAASUVORK5CYII='), url('data:image/svg+xml;utf8,<svg fill="none" height="14" viewBox="0 0 19 14" width="19" xmlns="http://www.w3.org/2000/svg"><path d="m10.7163 12.4602c-.5987.8296-1.83392.8296-2.43263 0l-6.9155-9.58239c-.715943-.99205-.00708-2.377812 1.21633-2.377812l13.831.000002c1.2234 0 1.9323 1.38576 1.2163 2.37781z" fill="%23efecd3" stroke="%23efecd3"/></svg>');
  background-position: left top, center calc(50% + 0.4rem);
  background-size: 4rem 0.4rem, 1.9rem 1.4rem;
`

const Content = styled.div`
  height: auto;
  overflow-x: hidden;
  overflow-y: auto;
  border-top-style: solid;
  border-top-color: ${props => props.theme.colors.vibrantBlack};
  border-bottom-left-radius: 1.05rem;
  transition-origin: center top;

  ${({ isCollapsed, maxHeight }) =>
    isCollapsed
      ? css`
          max-height: 0;
          border-top-width: 0;
          transition: max-height 233ms ease, border-top-width 34ms ease 233ms;
        `
      : css`
          max-height: calc(${maxHeight} - 6.6rem - 0.4rem * 2);
          border-top-width: 0.4rem;
          transition: max-height 233ms ease 34ms, border-top-width 34ms ease;
        `
  }

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

  ::-webkit-scrollbar-button:vertical:start:decrement {
    ${sharedStartScrollButtonStyles}
  }

  ::-webkit-scrollbar-button:vertical:start:decrement:hover {
    ${sharedScrollButtonHoverStyles}
  }

  ::-webkit-scrollbar-button:vertical:end:increment {
    ${sharedEndScrollButtonStyles}
  }

  ::-webkit-scrollbar-button:vertical:end:increment:hover {
    ${sharedScrollButtonHoverStyles}
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
