import React from 'react'
import PropTypes from 'prop-types'
import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie'

const withAuth = WrappedComponent => {
  class AuthComponent extends React.Component {
    // SSR: Pass down auth from request cookie:
    static async getInitialProps(ctx) {
      let props = {}
      if (WrappedComponent.getInitialProps) {
        props = await WrappedComponent.getInitialProps(ctx)
      }

      const { token } = ctx.req.cookies
      if (!token) {
        ctx.res.writeHead(302, { Location: '/401' })
        ctx.res.end()
        return { ...props }
      }

      const tokenData = jwt.decode(token, { complete: true })
      return {
        ...props,
        auth: {
          token,
          email: tokenData.payload?.email,
        },
      }
    }

    render() {
      let { auth } = this.props
      const { auth: _auth, children, ...props } = this.props

      // SSR yielded no auth, check client cookies:
      if (!auth) {
        const token = Cookies.get('token')

        // No auth, redirect to 401:
        if (!token) {
          document.location.pathname = '/401'
          return null
        }

        const tokenData = jwt.decode(token, { complete: true })
        auth = {
          token,
          email: tokenData.payload?.email,
        }
      }

      return (
        <WrappedComponent {...props} auth={auth}>
          {children}
        </WrappedComponent>
      )
    }
  }

  AuthComponent.propTypes = {
    auth: PropTypes.shape({
      token: PropTypes.string,
      email: PropTypes.string,
    }),
    children: PropTypes.node,
  }

  AuthComponent.defaultProps = {
    auth: undefined,
    children: undefined,
  }

  return AuthComponent
}

export default withAuth
