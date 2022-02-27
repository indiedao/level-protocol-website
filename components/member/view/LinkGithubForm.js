import { useState, useEffect, useCallback } from 'react'
import Button from '../../ui/Button'
import { githubClientId } from '../../../util/constants'

const LinkGithubForm = () => {
  const linkGithub = async () => {
    window.location = `https://github.com/login/oauth/authorize?client_id=${githubClientId}`
  }

  return (
    <div>
      <h2>Member Details</h2>
      <Button onClick={linkGithub}>Link Github</Button>
    </div>
  )
}

export default LinkGithubForm
