import PropTypes from 'prop-types'
import styled from 'styled-components'
import ShortUniqueId from 'short-unique-id'

import { H3, screenReaderTextStyles } from './Typography'
import { CloseBoldIcon, CollapseBoldIcon, ZoomBoldIcon } from './icons'

const uid = new ShortUniqueId()

const Container = styled.figure`
  align-self: start;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5.2rem 1fr;
  width: ${({ width }) => width}rem;
  height: ${({ height }) => height}rem;
  background-color: ${props => props.theme.colors.vibrantCream};
  border: 0.4rem solid ${props => props.theme.colors.vibrantBlack};
  border-radius: 0.4rem;
  box-shadow: 1.6rem 1.6rem 0 ${props => props.theme.colors.vibrantBlack};
`

const TitleBar = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr min-content min-content;
  justify-items: center;
  align-items: center;
  grid-gap: 1.2rem;
  padding: 0 1rem;
  max-height: 5.2rem;
  background-color: ${({ backgroundColor, theme }) =>
    theme.colors[backgroundColor]};
  border-bottom: 0.4rem solid ${props => props.theme.colors.vibrantBlack};
  user-select: none;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }
`

const Title = styled(H3)`
  display: grid;
  grid-template-columns: minmax(1.2rem, 1fr) min-content minmax(1.2rem, 1fr);
  grid-gap: 0.8rem;
  width: 100%;
  white-space: nowrap;
  color: ${props => props.theme.colors.vibrantCream};
  z-index: 1;

  &::before,
  &::after {
    content: '';
    min-width: 1.2rem;
    background: linear-gradient(
        180deg,
        transparent 0%,
        transparent calc(50% - 1rem),
        ${props => props.theme.colors.mutedBlack} calc(50% - 1rem),
        ${props => props.theme.colors.mutedBlack} calc(50% - 0.9rem),
        transparent calc(50% - 0.9rem),
        transparent calc(50% - 0.5rem),
        ${props => props.theme.colors.mutedBlack} calc(50% - 0.5rem),
        ${props => props.theme.colors.mutedBlack} calc(50% - 0.4rem),
        transparent calc(50% - 0.4rem),
        transparent calc(50% - 0rem),
        ${props => props.theme.colors.mutedBlack} calc(50% - 0rem),
        ${props => props.theme.colors.mutedBlack} calc(50% + 0.1rem),
        transparent calc(50% + 0.1rem),
        transparent calc(50% + 0.5rem),
        ${props => props.theme.colors.mutedBlack} calc(50% + 0.5rem),
        ${props => props.theme.colors.mutedBlack} calc(50% + 0.6rem),
        transparent calc(50% + 0.6rem),
        transparent calc(50% + 1rem),
        ${props => props.theme.colors.mutedBlack} calc(50% + 1rem),
        ${props => props.theme.colors.mutedBlack} calc(50% + 1.1rem),
        transparent calc(50% + 1.1rem),
        transparent 100%
      ),
      linear-gradient(
        180deg,
        transparent 0%,
        transparent calc(50% - 1.1rem),
        rgba(48, 47, 44, 0.6) calc(50% - 1.1rem),
        rgba(48, 47, 44, 0.6) calc(50% - 1rem),
        transparent calc(50% - 1rem),
        transparent calc(50% - 0.6rem),
        rgba(48, 47, 44, 0.6) calc(50% - 0.6rem),
        rgba(48, 47, 44, 0.6) calc(50% - 0.5rem),
        transparent calc(50% - 0.5rem),
        transparent calc(50% - 0.1rem),
        rgba(48, 47, 44, 0.6) calc(50% - 0.1rem),
        rgba(48, 47, 44, 0.6) calc(50% + 0rem),
        transparent calc(50% + 0rem),
        transparent calc(50% + 0.4rem),
        rgba(48, 47, 44, 0.6) calc(50% + 0.4rem),
        rgba(48, 47, 44, 0.6) calc(50% + 0.5rem),
        transparent calc(50% + 0.5rem),
        transparent calc(50% + 0.9rem),
        rgba(48, 47, 44, 0.6) calc(50% + 0.9rem),
        rgba(48, 47, 44, 0.6) calc(50% + 1rem),
        transparent calc(50% + 1rem),
        transparent 100%
      );
    z-index: -1;
  }
`

const Content = styled.div`
  overflow: hidden;
  background-color: ${({ backgroundColor, theme }) =>
    theme.colors[backgroundColor || 'mutedCream']};
`

const Caption = styled.figcaption`
  ${screenReaderTextStyles}
`

const NonInteractiveWindow = ({
  caption,
  children,
  contentBackgroundColor,
  height,
  title,
  titleBarBackgroundColor,
  width,
}) => {
  const labelId = uid()

  return (
    <Container height={height} width={width}>
      <TitleBar backgroundColor={titleBarBackgroundColor} aria-hidden>
        <CloseBoldIcon />
        <Title>{title}</Title>
        <ZoomBoldIcon />
        <CollapseBoldIcon />
      </TitleBar>
      <Content
        backgroundColor={contentBackgroundColor}
        aria-labelledby={labelId}
      >
        {children}
      </Content>
      <Caption id={labelId}>{caption}</Caption>
    </Container>
  )
}

NonInteractiveWindow.propTypes = {
  caption: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  contentBackgroundColor: PropTypes.string,
  height: PropTypes.number,
  title: PropTypes.string.isRequired,
  titleBarBackgroundColor: PropTypes.string,
  width: PropTypes.number,
}

NonInteractiveWindow.defaultProps = {
  height: 50,
  width: 50,
  titleBarBackgroundColor: 'vibrantBlue',
  contentBackgroundColor: 'mutedCream',
}

export default NonInteractiveWindow
