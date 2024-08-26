import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  console.log(process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL); // Should output '/sign-up'
  console.log(process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL); // Should output '/'

  return <SignUp
    forceRedirectUrl="/credits"
  />

}

export default SignUpPage