import { useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { CloseIcon, CollapseIcon, ZoomIcon } from './icons'

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Wrapper = styled.div`
  ${props =>
    props.zoom
      ? css`
          width: 100%;
          height: 100vh;
        `
      : css`
          width: 800px;
          height: 80%;
        `}
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.vibrantCream};
  border-radius: 16px;
  color: ${props => props.theme.colors.black};
  border: 2px solid ${props => props.theme.colors.vibrantBlack};
  box-shadow: 16px 16px 0px ${props => props.theme.colors.vibrantBlack};
`

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ChicagoFLF;
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 41px;
  padding: 13px 20px;
  background-color: ${props => props.theme.colors.vibrantCream};
  border-radius: 16px 16px 0 0;
  color: ${props => props.theme.colors.black};
  border-bottom: 2px solid ${props => props.theme.colors.vibrantBlack};

  div {
    display: flex;
    align-items: center;
  }

  button {
    padding: 0;
    margin: 0;
    border: none;
    text-decoration: none;
    line-height: 0;
    background-color: transparent;

    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }

  svg {
    height: 40px;
    width: 40px;
  }

  .title-actions {
    display: flex;
    gap: 16px;
    justify-content: space-arround;
    align-items: center;
  }
`

const Content = styled.div`
  background-color: ${props => props.theme.colors.vibrantCream};
  overflow: auto;
  font-size: 24px;
  font-family: 'Geneva', serif;
  border-radius: 0 0 16px 16px;
  font-weight: 400;

  ::-webkit-scrollbar {
    width: 40px;
  }

  ::-webkit-scrollbar-track-piece {
    background-color: ${props => props.theme.colors.vibrantCream};
    background-image: url('/images/scrollbar-pattern.png');
    background-repeat: repeat;
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

  ${props =>
    props.collapsed
      ? css`
          height: 5px;
          display: hidden;
        `
      : css`
          padding: 16px;
        `}
`

export const Window = ({
  children,
  title,
  handleClose,
  enableActions = false,
  open = false,
}) => {
  const [show, setShow] = useState(open)
  const [zoom, setZoom] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const closeWindow = () => {
    if (!enableActions) return

    setShow(false)

    if (handleClose) {
      handleClose()
    }
  }

  const toggleCollapsed = () => {
    if (!enableActions) return

    setCollapsed(!collapsed)
  }

  const toggleZoom = () => {
    if (!enableActions) return

    setZoom(!zoom)
  }

  if (show) {
    return (
      <Container>
        <Wrapper zoom={zoom}>
          <Title>
            <div>
              <button onClick={closeWindow} type="button">
                <CloseIcon />
              </button>
            </div>
            <div>{title}</div>
            <div className="title-actions">
              <button onClick={toggleZoom} type="button">
                <ZoomIcon />
              </button>
              <button onClick={toggleCollapsed} type="button">
                <CollapseIcon />
              </button>
            </div>
          </Title>
          <Content collapsed={collapsed}>{children}</Content>
        </Wrapper>
      </Container>
    )
  }

  return null
}

Window.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  enableActions: PropTypes.bool,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
}

Window.defaultProps = {
  enableActions: false,
  handleClose: undefined,
  open: false,
}
