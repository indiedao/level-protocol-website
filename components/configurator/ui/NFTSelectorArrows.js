import styled from 'styled-components'
import PropTypes from 'prop-types'

const Arrows = styled.div`
  --top: calc(
    clamp(0.2rem, 0.666vw, 0.4rem) * 3 + clamp(0.8rem, 2.666vw, 1.6rem) +
      clamp(3.2rem, 8vh, 9.3rem) / 2
  );

  position: relative;
  display: grid;
  grid-template-columns: 1fr;

  &::before {
    content: '';
    position: absolute;
    background: url(/images/pixel-arrow.png);
    top: var(--top, 5rem);
    right: clamp(1.6rem, 5.333vw, 3.2rem);
    height: 44px;
    width: 24px;
    transform: translateY(-50%);
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    background: url(/images/pixel-arrow.png);
    top: var(--top, 5rem);
    left: clamp(1.6rem, 5.333vw, 3.2rem);
    height: 44px;
    width: 24px;
    transform: translateY(-50%) scaleX(-1);
    z-index: 1;
  }
`

const NFTSelectorArrows = ({ children }) => <Arrows>{children}</Arrows>

NFTSelectorArrows.propTypes = {
  children: PropTypes.node.isRequired,
}

export default NFTSelectorArrows
