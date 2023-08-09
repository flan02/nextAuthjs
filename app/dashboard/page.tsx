'use client'
import { useSession } from 'next-auth/react'

const Dashboard = () => {
    const { data: session, status, update } = useSession()
    console.log(session, status)
    return (
        <div>Dashboard</div>
    )
}

export default Dashboard