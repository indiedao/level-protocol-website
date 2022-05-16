import styled from 'styled-components'
import GoogleReCAPTCHA from 'react-google-recaptcha'
import { useEffect, useRef } from 'react'
import Prompt from './Prompt'
import useWeb3 from '../../hooks/useWeb3'

const StyledGoogleReCAPTCHA = styled(GoogleReCAPTCHA)`
  position: absolute;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
`

const ConfiguratorRecaptcha = ({ onReCAPTCHASuccess, onReCAPTCHAFail }) => {
  const recaptchaRef = useRef(null)
  const { bearerToken } = useWeb3()

  useEffect(() => {
    if (recaptchaRef.current) {
      try {
        recaptchaRef.current.execute()
      } catch (error) {
        onReCAPTCHAFail(error.message)
      }
    }
  }, [onReCAPTCHAFail, recaptchaRef])

  const onReCAPTCHAChange = async code => {
    try {
      if (!code) {
        throw new Error('Unexpected humanity response.')
      }

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
      onReCAPTCHAFail(error.message)
    } finally {
      recaptchaRef.current?.reset()
    }
  }

  return (
    <>
      <StyledGoogleReCAPTCHA
        ref={recaptchaRef}
        theme="dark"
        size="invisible"
        type="image"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        onChange={onReCAPTCHAChange}
        onErrored={() => onReCAPTCHAFail('Unable to test humanity.')}
      />
      <Prompt message="Testing humanity..." />
    </>
  )
}

export default ConfiguratorRecaptcha
