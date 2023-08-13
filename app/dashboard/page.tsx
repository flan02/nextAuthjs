'use client'
import { useSession, signOut } from 'next-auth/react'

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
            <p>{session?.user?.email}</p>
            <p>{session?.user?.name}</p>
            <button onClick={() => { signOut() }}>Logout</button>
        </>
    )
}

export default Dashboard