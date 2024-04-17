/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect } from "react"
import axios from "axios"
import styles from '../page.module.css'
import { useRouter } from 'next/navigation'
type Props = {}

const Loginpage = (props: Props) => {
  const router = useRouter()
  const [credentials, setCredentials] = React.useState({ email: '', password: '' })
  const [response, setResponse] = React.useState({})

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
    const response = await axios.post('http://localhost:3000/api/auth', credentials, {
      headers: {
        'Content-Type': 'application/json'
      },

    })
    //console.log(response);
    if (response.status == 200) {
      setResponse(response.data)
      router.push('/home')
    }


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
      <br />
      <div className={styles.box}>
        <p className={styles.paragraph}>
          {JSON.stringify(response)}
        </p>
      </div>


    </>
  )
}

export default Loginpage