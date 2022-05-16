import styled from 'styled-components'
import GoogleReCAPTCHA from 'react-google-recaptcha'
import { useEffect, useRef } from 'react'
import ConfiguratorWrapper from './ConfiguratorWrapper'
import useWeb3 from '../../hooks/useWeb3'

const StyledGoogleReCAPTCHA = styled(GoogleReCAPTCHA)`
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
`

const ConfiguratorRecaptcha = ({ onReCAPTCHASuccess, onReCAPTCHAFail }) => {
  const recaptchaRef = useRef()
  const { bearerToken } = useWeb3()

  useEffect(() => {
    if (recaptchaRef.current) {
      console.log('ReCAPTCHA initializing') // eslint-disable-line no-console
      recaptchaRef.current.execute()
    }
  }, [recaptchaRef])

  const onReCAPTCHAChange = async code => {
    if (!code) {
      throw new Error('ReCAPTCHA Failed!')
    }

    try {
      const resp = await fetch('/api/verify-human', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify({
          code,
        }),
      })

      const data = await resp.json()

      if (data.success) {
        onReCAPTCHASuccess()
      } else {
        onReCAPTCHAFail()
      }
    } catch (error) {
      onReCAPTCHAFail(error)
    } finally {
      recaptchaRef.current?.reset()
    }
  }

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
