import styled from 'styled-components'
import GoogleReCAPTCHA from 'react-google-recaptcha'
import ConfiguratorWrapper from './ConfiguratorWrapper'

const StyledGoogleReCAPTCHA = styled(GoogleReCAPTCHA)`
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
`

const ConfiguratorRecaptcha = ({ onReCAPTCHAChange, recaptchaRef }) => {
  return (
    <ConfiguratorWrapper>
      <StyledGoogleReCAPTCHA
        ref={recaptchaRef}
        theme="dark"
        size="invisible"
        type="image"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        onChange={onReCAPTCHAChange}
      />
    </ConfiguratorWrapper>
  )
}

export default ConfiguratorRecaptcha
