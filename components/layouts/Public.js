import PropTypes from 'prop-types'
import styled from 'styled-components'

import theme from '../../util/theme'

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  min-height: 100vh;

  > * {
    z-index: 1;
  }

  &::before {
    content: '';
    position: fixed;
    top: -0.1rem;
    right: -0.1rem;
    bottom: -0.1rem;
    left: -0.1rem;
    background: ${theme.halftones.md},
      center center / 100% 100% no-repeat url('images/background.jpg');
    z-index: 0;
  }
`

const Public = ({ children }) => {
  return <Layout>{children}</Layout>
}

Public.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Public
