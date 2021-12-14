import { useState } from 'react'
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
  padding: 16px;
  background-color: ${props => props.theme.colors.vibrantCream};
  border-radius: 16px 16px 0 0;
  color: ${props => props.theme.colors.black};
  border-bottom: 2px solid ${props => props.theme.colors.vibrantBlack};

  a {
    border: none;
    text-decoration: none;
    line-height: 0;

    &:hover {
      opacity: 0.8;
    }
  }

  svg {
    height: 40px;
    width: 40px;
  }

  .title-actions {
    display: flex;
    justify-content: space-arround;
    align-items: center;
  }
`

const Content = styled.div`
  overflow: auto;
  font-size: 24px;
  font-family: 'Geneva', serif;
  font-weight: 400;

  ::-webkit-scrollbar {
    width: 40px;
  }

  ::-webkit-scrollbar-track-piece {
    background-color: ${props => props.theme.colors.cream};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.vibrantBlack};
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

export const Dialog = ({ children, title, handleClose, open = false }) => {
  const [show, setShow] = useState(open)
  const [zoom, setZoom] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const closeDialog = () => {
    setShow(false)

    if (handleClose) {
      handleClose()
    }
  }

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const toggleZoom = () => {
    setZoom(!zoom)
  }

  if (show) {
    return (
      <Container>
        <Wrapper zoom={zoom}>
          <Title>
            <div>
              <button onClick={closeDialog} type="button">
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
