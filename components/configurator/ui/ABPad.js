import styled from 'styled-components'
import PropTypes from 'prop-types'

import ASvg from '../assets/a.svg'
import BSvg from '../assets/b.svg'
import Button from './Button'

const Wrapper = styled.div`
  align-self: center;
  display: grid;
  justify-items: center;
  grid-gap: 0.4rem;
  transform: rotate(-45deg) translate(7%, -5%);
`

const Labels = styled.div`
  display: flex;
  justify-content: space-between;
  width: 15.5rem;
`

const StyledABPad = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: repeat(2, min-content);
  grid-gap: 2rem;
  padding: 1.6rem 2rem;
  background: linear-gradient(
      180deg,
      rgba(214, 209, 190, 0) 0.95%,
      #fff7da 99.28%
    ),
    linear-gradient(0deg, rgba(214, 209, 190, 0.08) 74.73%, #d6d1be 99.33%),
    #f1eed8;
  border-radius: 50rem;

  > button {
    transform: rotate(45deg);
  }
`

const ABPad = ({ a, b }) => (
  <Wrapper>
    <Labels>
      <BSvg height={28} />
      <ASvg height={28} />
    </Labels>
    <StyledABPad>
      <Button onClick={b} text="B" variant="b" />
      <Button onClick={a} text="A" variant="a" />
    </StyledABPad>
  </Wrapper>
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
