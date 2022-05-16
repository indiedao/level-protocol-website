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

  &::before,
  &::after {
    content: '';
    position: absolute;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAsCAYAAAB/nHhDAAAAOUlEQVRYw+3RsQ0AQAjDQKZmixcjQ/sD0HGRUluyo172/9geAGWaAGiiCYAmRwCUcM4555xzDrCyASm4w8APqimgAAAAAElFTkSuQmCC');
    top: var(--top, 5rem);
    height: 44px;
    width: 24px;
    z-index: 1;
  }

  &::before {
    right: clamp(1.6rem, 5.333vw, 3.2rem);
    transform: translateY(-50%);
  }

  &::after {
    left: clamp(1.6rem, 5.333vw, 3.2rem);
    transform: translateY(-50%) scaleX(-1);
  }
`

const NFTSelectorArrows = ({ children }) => <Arrows>{children}</Arrows>

NFTSelectorArrows.propTypes = {
  children: PropTypes.node.isRequired,
}

export default NFTSelectorArrows
