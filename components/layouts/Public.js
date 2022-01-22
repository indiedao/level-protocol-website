import PropTypes from 'prop-types'
import styled from 'styled-components'

import theme from '../../util/theme'

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;

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
      center center / 100% 100% no-repeat
        url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAUFBQUFBQYGBgYICQgJCAwLCgoLDBINDg0ODRIbERQRERQRGxgdGBYYHRgrIh4eIisyKigqMjw2NjxMSExkZIYBBQUFBQUFBgYGBggJCAkIDAsKCgsMEg0ODQ4NEhsRFBERFBEbGB0YFhgdGCsiHh4iKzIqKCoyPDY2PExITGRkhv/CABEIABsAMAMBIgACEQEDEQH/xAAZAAACAwEAAAAAAAAAAAAAAAAEBgADBQL/2gAIAQEAAAAAQJCy6K6+nFszN0Ahs37E/vPCZGr/xAAWAQEBAQAAAAAAAAAAAAAAAAAHBgX/2gAIAQIQAAAAuz2aZsAz/8QAFwEAAwEAAAAAAAAAAAAAAAAABQYHCP/aAAgBAxAAAAAI7VHBpGsf/8QAIhAAAgIBBAMAAwAAAAAAAAAAAQMAAgQGESEyBRJCEBVR/9oACAEBAAE/APwImgnoNoxUOI0fMslg+YrFaw8CeI04/K+TK6UXQbWHMz9MelCaCW06g16iM0ysnrMbT6VEEgTx10YZAAE9MXN5PBn6Kra8M3EUy+3Yy17f2ZDGAHaxmM1hZzYzGZcbbWM8e5pHcz//xAAdEQACAgMBAQEAAAAAAAAAAAABAgMEABESBRMW/9oACAECAQE/APzUNWs8sjA6GegjjvgHQOJd+cnJJB3j2pZIypY6z0GjhrvzGNnLtTTF+s//xAAgEQACAQQCAwEAAAAAAAAAAAABAwQAAgURBiESExRh/9oACAEDAQE/ABkw1gtsIrjkqCuZZ9DLakjFT1evQGx0aXkMglnTqVNyXkJRkndh3quN85yDxYhmz+1//9k=');
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
