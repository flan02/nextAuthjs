'use client'
import React from 'react'
import Image from "next/image"
import { signOut } from 'next-auth/react'
type Props = {}

const Users = (_props: Props) => {
  const [users, setUsers] = React.useState([])
  return (
    <article>

      <button
        onClick={async () => {
          const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const data = await response.json();
          console.log(data);
          setUsers(data)
        }}
      >get users</button> <br /><br />

      {
        users.map((user: any) => (
          <div key={user._id}>
            <h3><span>user:</span> {user.fullname}</h3>
            <p>email: {user.email}</p>
            <Image src={user.image} alt={user.fullname} width={100} height={100} />
            <h6>id: {user._id}</h6>
          </div>
        ))
      }
    </article>
  )
}

export default Users