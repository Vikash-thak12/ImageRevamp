import { UserButton } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div>
      <h1>This is Home page</h1>
      <UserButton  />
    </div>
  )
}

export default page

