'use client'

import axios from "axios"
import { set } from "mongoose"
import React from "react"

type Props = {}


const HomePage = (props: Props) => {
  const [profile, setProfile] = React.useState<any[]>([])
  const getProfile = async () => {
    const response = await axios.get('http://localhost:3000/api/profile', {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log(response);
    setProfile(response.data)
  }

  const logout = async () => {
    const response = await axios.post('http://localhost:3000/api/logout')
    console.log(response);
  }

  const parseDate = (fechaUnix: number) => {
    return new Date(fechaUnix * 1000).toLocaleString();

  };

  return (
    <>
      <h1>Profile</h1>
      <button onClick={getProfile}>get Profile</button>
      <button onClick={logout}>Logout</button>
      <br /><br />
      {/* JSON.stringify(profile) */}
      {
        profile.length > 0
          ? profile.map((item: any, index: number) => {
            return (
              <div key={index}>
                <p>user: {item.email}</p>
                <p>password: {item.password}</p>
                <p>iat: {parseDate(item.iat)} </p>
                <p>exp: {parseDate(item.exp)}</p>
              </div>
            )
          })
          : <p>No profile encountered</p>
      }
    </>
  )
}

export default HomePage