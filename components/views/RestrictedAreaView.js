import styled from 'styled-components'
import useWeb3 from '../hooks/useWeb3'
import { Body1 } from '../ui/Typography'
import Button from '../ui/Button'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2.4rem;
`

const RestrictedAreaView = () => {
  const { connect } = useWeb3()
  return (
    <Wrapper>
      <Body1 color="white">Admin permissions required</Body1>
      <Button onClick={connect}>Connect Wallet</Button>
    </Wrapper>
  )
}

export default RestrictedAreaView
