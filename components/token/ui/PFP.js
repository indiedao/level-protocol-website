import styled from 'styled-components'
import PropTypes from 'prop-types'

const fallbackPixel =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAEAAQMBEQACEQEDEQH/xABLAAEAAAAAAAAAAAAAAAAAAAAHEAEAAAAAAAAAAAAAAAAAAAAAAQEBAAAAAAAAAAAAAAAAAAAFBxEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AWEfMP//Z'

const PFPFigure = styled.figure`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: clamp(3.2rem, 8vh, 9.3rem);
  width: clamp(3.2rem, 8vh, 9.3rem);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQAgMAAACaKAorAAAADFBMVEUAAAD//Nj//Nj//NhINzCmAAAAA3RSTlMA/gEHTjh7AAAAiUlEQVR4Xu3YMQqAQAxE0WVL7+f9T2EpESz8MEXYQhiFmS7h1UnIkNQdaVoQ4qFeBJHKjiAwM4JI04UwqowIo8qC1KjyIDWqgjCtCsJ06pMoCNOpF1FQUNC2/3VgBO1Z+SvoWD6ygno1axhQq+Y5bAilxoZQaiwIVUoKY0IwiB/xm5oFcSIcwoQuPyV9PGxoMVMAAAAASUVORK5CYII=');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
    z-index: 1000;
  }
`

const Img = styled.img`
  height: calc(100% - 0.3rem);
  width: calc(100% - 0.3rem);
  border-radius: 1000rem;
  object-fit: cover;
`

const PFP = ({ alt, src }) => (
  <PFPFigure>
    <Img alt={alt} src={src || fallbackPixel} />
  </PFPFigure>
)

PFP.propTypes = {
  src: PropTypes.string,
}

PFP.defaultProps = {
  src: undefined,
}

export default PFP
