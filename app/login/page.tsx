'use client'

import React from "react"
import axios from "axios"

type Props = {}

const Loginpage = (props: Props) => {
  const [credentials, setCredentials] = React.useState({ email: '', password: '' })

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(e.target.value, e.target.name);
    setCredentials({
      ...credentials, // * spread operator: Add the previous state before the new one.
      [e.target.name]: e.target.value
    })
  }

  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //console.log(credentials);
    const response = await axios.post('http://localhost:3000/api/auth', credentials)
    console.log(response);
  }

  return (
    <>
      <form onSubmit={handlerSubmit} autoComplete="off">
        <input
          onChange={(e) => handlerChange(e)}
          name="email" type="email" placeholder="email" /> <br />
        <input
          onChange={(e) => handlerChange(e)}
          name="password" type="password" placeholder="password" /> <br />
        <button type="submit">Login</button>
      </form>
      {JSON.stringify(credentials)}

    </>
  )
}

export default Loginpage