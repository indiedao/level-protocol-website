import styled from 'styled-components'
import PropTypes from 'prop-types'

import ASvg from '../assets/a.svg'
import BSvg from '../assets/b.svg'
import Button from './Button'

const StyledABPad = styled.div`
  align-self: end;
  justify-self: end;
  display: grid;
  justify-items: center;
  grid-gap: min(0.666vw, 0.4rem);
  margin: auto max(-0.333vw, -0.2rem) min(5vw, 3rem) auto;
  transform: rotate(-45deg) translate(7%, -5%);
  transform-origin: center;
`

const Labels = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: min(25.833vw, 15.5rem);

  > svg {
    height: min(4.666vw, 2.8rem);
  }
`

const Pad = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: repeat(2, min-content);
  grid-gap: min(3.333vw, 2rem);
  padding: min(2.666vw, 1.6rem) min(3.333vw, 2rem);
  background: linear-gradient(
      180deg,
      rgba(214, 209, 190, 0) 0.95%,
      #fff7da 99.28%
    ),
    linear-gradient(0deg, rgba(214, 209, 190, 0.08) 74.73%, #d6d1be 99.33%),
    #f1eed8;
  border-radius: 1000rem;

  > button {
    transform: rotate(45deg);
  }
`

const ABPad = ({ a, b }) => (
  <StyledABPad>
    <Labels>
      <BSvg />
      <ASvg />
    </Labels>
    <Pad>
      <Button onClick={b} text="B" variant="b" />
      <Button onClick={a} text="A" variant="a" />
    </Pad>
  </StyledABPad>
)

ABPad.propTypes = {
  a: PropTypes.func,
  b: PropTypes.func,
}

ABPad.defaultProps = {
  a: () => null,
  b: () => null,
}

export default ABPad
