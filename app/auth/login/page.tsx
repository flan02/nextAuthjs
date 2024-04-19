'use client'
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import Link from "next/link"
import React from "react"

type Props = {}
const opts = {
  required: {
    value: true,
    message: `This field is required`
  },
  minLength: { value: 3, message: 'Min length is 3' },
  maxLength: { value: 30, message: 'Max length is 20' }
}
const LoginPage = (_props: Props) => {
  const router = useRouter()
  const form = useForm() // ? Default cancelling e.preventDefault()
  const [error, setError] = React.useState('')
  const onSignIn = form.handleSubmit(async (data) => {
    //console.log(data)
    const response = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })

    console.log(response);
    if (response?.error) {
      setError(response.error)
    } else {
      router.push('/home')

    }

  })
  return (
    <>
      <h1>Sign In</h1>
      <form onSubmit={onSignIn}>
        <input type="email" {...(form.register('email', opts))} placeholder="email" /> <br />
        {form.formState.errors.email && <span>{`${form.formState.errors.email?.message}`}</span>}
        <input type="password" {...(form.register('password', opts))} placeholder="******" /> <br />
        {form.formState.errors.password && <span>{`${form.formState.errors.password?.message}`}</span>}
        <button >Sign In</button>
      </form>
      <br />
      <Link href="/auth/register" >Do not have account yet? Register</Link>
      {
        error && <h4 style={{ color: 'red' }}>{error}</h4>
      }
    </>
  )
}

export default LoginPage