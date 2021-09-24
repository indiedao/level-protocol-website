import React from 'react'
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

      let token = ctx.req.cookies.token
      if (!token) {
        ctx.res.writeHead(302, { Location: '/401' })
        ctx.res.end()
        return
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
      let auth = this.props.auth

      // SSR yielded no auth, check client cookies:
      if (!auth) {
        const token = Cookies.get('token')

        // No auth, redirect to 401:
        if (!token) {
          document.location.pathname = '/401'
          return <></>
        }

        const tokenData = jwt.decode(token, { complete: true })
        auth = {
          token,
          email: tokenData.payload?.email,
        }
      }

      return (
        <WrappedComponent {...this.props} {...auth}>
          {this.props.children}
        </WrappedComponent>
      )
    }
  }

  return AuthComponent
}

export default withAuth
