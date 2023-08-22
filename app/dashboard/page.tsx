'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

const Dashboard = () => {
    const { data: session, status, update } = useSession()
    console.log(session, status)
    /* 
    {JSON.stringify({ session, status }, null, 2)} 
    */
    console.log('Session frontend:', session);
    return (
        <>
            <h1>Dashboard</h1>
            <p>Welcome {session?.user?.email}</p>
            <p>{session?.user?.name}</p>


        </>
    )
}

export default Dashboard