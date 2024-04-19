'use client'


import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"

type Props = {}

const opts = {
  required: {
    value: true,
    message: `This field is required`
  },
  minLength: { value: 3, message: 'Min length is 3' },
  maxLength: { value: 30, message: 'Max length is 20' }
}

const RegisterPage = (_props: Props) => {
  const router = useRouter()
  const form = useForm() // ? Default cancelling e.preventDefault() 
  const onSubmit = form.handleSubmit(async (data) => {
    //console.log(data)
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    console.log(response);

    if (response.status === 200) router.push('/auth/login')

  })
  return (
    <>
      <form action="" onSubmit={onSubmit}>
        <input type="text" {...(form.register('fullname', opts))} placeholder="name" /> <br />
        {form.formState.errors.fullname && <span>{`${form.formState.errors.fullname?.message}`}</span>}
        <input type="email" {...(form.register('email', opts))} placeholder="email" /> <br />
        {form.formState.errors.email && <span>{`${form.formState.errors.email?.message}`}</span>}
        <input type="password" {...(form.register('password', opts))} placeholder="******" /> <br />
        {form.formState.errors.password && <span>{`${form.formState.errors.password?.message}`}</span>}
        <input type="password" {...(form.register('confirmPassword', opts))} placeholder="*********" /> <br />
        {form.formState.errors.confirmPassword && <span>{`${form.formState.errors.confirmPassword?.message}`}</span>}
        <button >register</button>
      </form>

    </>
  )
}

export default RegisterPage