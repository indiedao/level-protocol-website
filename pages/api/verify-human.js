import withMethods from '../../util/api/withMethods'
import withAuth from '../../util/api/withAuth'
import withValidParams from '../../util/api/withValidParams'

const validateReCaptchaCode = async code => {
  const resp = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${code}`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      method: 'POST',
    },
  )

  const data = await resp.json()

  return data.success
}

const handler = async (req, res, { auth: { address } }) => {
  try {
    const { code } = req.body

    const isValid = await validateReCaptchaCode(code)

    if (isValid) {
      res.statusCode = 200
      res.json({
        success: true,
        address,
      })
    } else {
      throw new Error('Invalid ReCAPTCHA code!')
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('error', e)
    res.statusCode = 500
    res.json({
      success: false,
      error: 'Unknown error verifying ReCAPTCHA!',
    })
  }
}

export default withAuth(
  withValidParams(
    {
      code: {
        presence: true,
      },
    },
    withMethods(['POST'], handler),
  ),
)
