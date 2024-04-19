'use client'

import { signOut } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"

type Props = {}

const LogoutPage = (props: Props) => {
  const router = useRouter()
  const onSignOut = async () => {
    const response = await signOut({
      redirect: true,
      callbackUrl: '/home'
    })
    console.log(response);

  }
  return (
    <>
      <h2>Really do you want to leave ❓</h2>
      <button onClick={onSignOut}>Logout</button>
    </>
  )
}

export default LogoutPage